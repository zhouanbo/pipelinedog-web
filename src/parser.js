import path from 'path'
import yaml from 'js-yaml'
import { flatten, unflatten } from 'flat'


export default class Parser {

  constructor() {

  }

  //Entry func
  parseStep(text, gvar, flist, steps) {
    //concat global vars with the step code
    let parseText = gvar + "\n" + text
    //read raw step obj
    let rawObj = {}
    try {
      rawObj = yaml.safeLoad(parseText)
    } catch (e) {
      console.log(e)
      return
    }
    //replace vars
    let rvObj = this.replaceVars(rawObj)
    //get only the keys inside step
    let stepObj = rvObj[Object.keys(rvObj)[0]]
    //check stepOjb status
    if (!stepObj || !stepObj['in'] || !stepObj['run']) return
    console.log("stepObj:")
    console.log(stepObj)
    //set step ID
    stepObj['id'] = Object.keys(rvObj)[0]
    //process input lines
    let lines = this.processInArr(stepObj, flist, steps)
    //console.log("inLines:\n"+lines)
    //count loops for this step
    let loopNum = this.countLoop(stepObj, lines)
    //console.log("loopNum:\n"+loopNum)
    //parse the LEASH expressions
    let { command, outObj } = this.parseLEASH(stepObj, lines, loopNum)
    //console.log("command:\n"+command)

    return { 
      id: stepObj['id'],
      name: stepObj.name, 
      command: command, 
      out: outObj, 
      comment: stepObj.comment 
    }
  }

  combineSteps(stepsObj) {

  }

  replaceVars(rawObj) {
    let varObj = {}
    let gvarObj = {}
    let rObj = rawObj

    let flatObj = flatten(rObj, {safe: true})
     
    //change numbers to strings
    Object.keys(flatObj).map((key) => {
      if (typeof(flatObj[key]) === 'number') flatObj[key] = flatObj[key].toString()
    })

    //get vars
    Object.keys(rObj).map((key, index) => {
      if (index === Object.keys(rObj).length-1) {
        Object.keys(rObj[key]).map((stepKey) => {
          varObj[stepKey] = rObj[key][stepKey]
        })      
        let flatStepObj = flatten(rObj[key], {safe: true})
        Object.keys(flatStepObj).map((stepKey) => {
            varObj[stepKey] = flatStepObj[stepKey]
        })
      } else {
        gvarObj[key] = rObj[key]
      }
    })

    let flatVarObj = Object.assign(varObj, flatten(gvarObj, {safe: true}))

    //switch vars in a string
    const processValue = (value) => {
      if (typeof(value) === 'string') {
        //sort to make sure the longer vars get recognized first
        Object.keys(flatVarObj).sort((a, b)=>{return b.length-a.length}).map((processKey) => { 
          let pos = typeof(value) === 'string' ? value.indexOf('$'+processKey, pos + 1) : -1
          while (pos !== -1) {
            if (typeof(flatVarObj[processKey]) === 'string') {
              value = value.replace('$'+processKey, flatVarObj[processKey])
            } else {
              value = flatVarObj[processKey]
            }
            pos = typeof(value) === 'string' ? value.indexOf('$'+processKey, pos + 1) : -1
          }      
        })
        return value
      }
    }
console.log(flatVarObj)
    //replace keys
    Object.keys(flatObj).map((key) => {
      let processedKey = processValue(key)
      if (processedKey !== key) {
        flatObj[processedKey] = flatObj[key]
        delete flatObj[key]
      }
    })
    //replace values
    const haveVar = () => {
      let rKey = false
      Object.keys(flatObj).map((key) => {
        Object.keys(flatVarObj).map((varKey) => { 
          if (flatObj[key] && typeof(flatObj[key]) === 'string' && flatObj[key].indexOf('$'+varKey) > -1 && key.indexOf("comment") === -1) {
            rKey = key
          }
        })
      })
      return rKey
    }
    let varKey
    while (varKey = haveVar()) {
      console.log(varKey)
      flatObj[varKey] = processValue(flatObj[varKey])
    }

    rObj = unflatten(flatObj)
    //remove var definitions
    let rObjKeys = Object.keys(rObj)
    rObjKeys.map((key, index) => {
      if (index !== rObjKeys.length-1) {
        delete rObj[key]
      }
    })

    return rObj
  }

  processInArr(stepObj, flist, steps) {
    //process in array
    let inArr = []
    if (stepObj['in']) {
      if (typeof(stepObj['in']) === 'string') {
        inArr.push(stepObj['in'])
      } else {
        stepObj['in'].map((input) => {
          inArr.push(input)
        })
      }
    } else {
      return
    }
    //concat in content
    let lines = []
    inArr.map((inFile) => {
      if (inFile === "$LIST_FILE") {
        let subLine = []
        flist.split('\n').map((line) => {
          subLine.push(line)
        })
        lines.push(subLine)
      } else {
        steps.map((step) => { 
          Object.keys(step.out).map((outKey) => {
            let outStr = outKey === 'default' ? "" : "."+outKey
            if (inFile === "$"+step.id+".out"+outStr) {
              let subLine = []
              step.out[outKey].split('\n').map((line) => {
                subLine.push(line)
              })
              lines.push(subLine)
            }
          })
          
        })
      }
    })
    return lines
  }

  countLoop(stepObj, lines) {
    let flatLines = [].concat(...lines)
    let loopNum = flatLines.length
    Object.keys(stepObj).map((key) => {
      //find LEASH expressions
      if (key.indexOf('~') === 0) {
        if (stepObj[key]['file'] && stepObj['in']) {
          let fileArr = this.parseRange(stepObj[key]['file'], stepObj['in']).map((v) => v-1)
          let concatArr = lines.filter((v, i) => {return fileArr.includes(i)})
          flatLines = [].concat(...concatArr)
        }
        if (stepObj[key]['line']) {
          let lineStr = stepObj[key]['line']
          let lineArr = []
          if (lineStr.indexOf(':') > -1) {
            lineArr = lineStr.split(':')
          } else {
            lineArr[0] = lineStr
            lineArr[1] = 1
          }
          let selectedLineNum = this.parseRange(lineArr[0], flatLines).length
          let actualLineNum = selectedLineNum < flatLines.length ? selectedLineNum : flatLines.length
          let newNum = Math.floor(actualLineNum / lineArr[1])
          loopNum = newNum < loopNum ? newNum : loopNum
        }
      }
    })
    return loopNum
  }

  parseLEASH(stepObj, lines, loopNum) {
    const LEASH = (LEASHObj, loop) => {
      let flatLines = []
      let eachLoop = 1

      if (LEASHObj.file) {
        let fileArr = this.parseRange(LEASHObj['file'], stepObj['in']).map((v) => v-1)
        let concatArr = lines.filter((v, i) => {return fileArr.includes(i)})
        flatLines = [].concat(...concatArr)
      } else {
        flatLines = [].concat(...lines)
      }

      let selectedLines = []
      if (LEASHObj.line) {
        let lineStr = LEASHObj['line']
        let lineArr = []
        if (lineStr.indexOf(':') > -1) {
          lineArr = lineStr.split(':')
          eachLoop = lineArr[1] === 0 ? flatLines.length : lineArr[1]
        } else {
          lineArr[0] = lineStr
        }
        let selectedLineArr = this.parseRange(lineArr[0], flatLines).map((v) => v-1)
        selectedLines = flatLines.filter((v, i) => {return selectedLineArr.includes(i)})
      }

      //filter lines for each loop
      let loopingLines = selectedLines.filter((v, i) => {return i >= eachLoop*loop && i < eachLoop*(loop+1)})

      let modLines = []
      if (LEASHObj.mods) {
        modLines = loopingLines.map((line) => {
          let modLine = LEASHObj.mods
          //predefined vars
          let pvars = {
            "$ENTRY": line,
            "$FILENAME": path.basename(line),
            "$DIRNAME": path.dirname(line),
            "$FILENAME_NOEXT": path.basename(line).substr(0, line.lastIndexOf('.')),
          }
          Object.keys(pvars).map((key) => {
            let pos = LEASHObj.mods.indexOf(key)
            while (pos !== -1) {   
              modLine = modLine.replace(key, pvars[key])
              pos = LEASHObj.mods.indexOf(key, pos + 1)
            }
          })
          return modLine
        })
      }

      let returnStr = ""
      if (LEASHObj.sep) {
        returnStr = modLines.join(LEASHObj.sep)
      } else {
        returnStr = modLines.join(' ')
      }

      return returnStr
    }

    let command = ""
    for (let i = 0; i < loopNum; i++) {
      //parse one command without loop
      let run = stepObj.run
      Object.keys(stepObj).map((key) => {
        if (key.indexOf('~') === 0) {
          let pos = run.indexOf(key)
          while (pos !== -1) {
            run = run.replace(key, LEASH(stepObj[key], i))
            pos = stepObj.run.indexOf(key, pos + 1)
          }
        }
      })
      command += run+"&\n"     
    }
    
    let outObj = {}
    let flatObj = flatten(stepObj, {safe: true, maxDepth: 2})
    Object.keys(flatObj).map((outKey) => {
      if (outKey.indexOf('out') === 0) {
        let outStr = flatObj[outKey]
        let result = ""
        for (let i = 0; i < loopNum; i++) {
          //decide to parse LEASH or string
          if (typeof(outStr) === 'string') {
            Object.keys(flatObj).map((key) => {
              if (key.indexOf('~') === 0) {
                let pos = outStr.indexOf(key)
                while (pos !== -1) {
                  outStr = outStr.replace(key, LEASH(flatObj[key], i))
                  pos = outStr.indexOf(key, pos + 1)
                }
              }
            })
          } else {
            outStr = LEASH(outStr, i)
          }
          result += outStr+'\n'
        }
        if (outKey === 'out') {
          outObj['default'] = result
        } else {
          outObj[outKey.substr(outKey.indexOf('.')+1, outKey.length)] = result
        }
      }
    })

    return { command, outObj }
  }

  parseRange(s, arr) {
    let length = arr.length
    let r = []
    if (s.indexOf('/') > -1) {
      //parse regex range
      let regex = new RegExp(s.slice(1,-1))
      arr.map((string, i) => {
        if (string.search(regex) > -1) {
          r.push(i+1)
        }
      })
      return r
    } else {
      //parse numeric range
      let a = s.split(',')
      a.map((ss, i) => {
        if (ss.indexOf('-') > -1) {
          let b = ss.split('-');
          if (b[0]==="" && b[1]==="") {b[0] = 1; b[1] = length}
          else if (b[1]==="") b[1] = length
          else if (b[0]==="") b[0] = 1
          else if (b.length > 2 || Number(b[0]) > Number(b[1])) {
            console.log("illegal range.")
            return
          }
          for (let i = Number(b[0]); i <= Number(b[1]); i++) {
            r.push(i)
          }
        } else {
          r.push(Number(ss))
        }
      })
      r.sort((x,y) => x-y)
      return [...new Set(r)]
    }
  }

} 