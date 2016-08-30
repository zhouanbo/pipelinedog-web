import yaml from 'js-yaml'
import { flatten, unflatten } from 'flat'


export default class Parser {

  constructor() {

  }

  replaceVars(rawObj) {
    let varObj = {}
    let rObj = rawObj
        
    const isStep = (testObj) => {
      let stepTest = false
      Object.keys(testObj).map((testKey) => {
        if (testKey.indexOf('~') === 0) {
          stepTest = true
        }
      })
      return stepTest
    }
    //switch vars in a string
    const processValue = (value) => {
      if (typeof(value) === 'string') {
        let flatVarObj = flatten(varObj)
        Object.keys(flatVarObj).map((processKey) => { 
          let pos = value.indexOf('$'+processKey)
          while (pos !== -1) {
            value = value.replace('$'+processKey, flatVarObj[processKey])
            pos = value.indexOf('$'+processKey, pos + 1)
          }      
        })
        return value
      }
    }
    //get vars
    Object.keys(rObj).map((key) => {
      if (rObj[key] && typeof(rObj[key]) !== 'string' && isStep(rObj[key])) {
        let flatStepObj = flatten(rObj[key])
        Object.keys(flatStepObj).map((stepKey) => {
          varObj[stepKey] = flatStepObj[stepKey]
        })
      } else {
        varObj[key] = rObj[key]
      }
    })

    let flatObj = flatten(rObj)
    let flatVarObj = flatten(varObj)

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
      let varTest = false
      Object.keys(flatObj).map((key) => {
        Object.keys(flatVarObj).map((varKey) => { 
          if (flatObj[key] && flatObj[key].indexOf('$'+varKey) > -1) {
            varTest = true
          }
        })
      })
      return varTest
    }
    while (haveVar()) {
      Object.keys(flatObj).map((key) => {
        flatObj[key] = processValue(flatObj[key])
      })
    }

    rObj = unflatten(flatObj)
    //remove var definitions
    Object.keys(rObj).map((key) => {
      if (!(rObj[key] && typeof(rObj[key]) !== 'string' && isStep(rObj[key]))) {
        delete rObj[key]
      }
    })

    return rObj
  }

  countLoop(stepObj, lines) {
    let flatLines = lines.reduce((a, b) => {
      a.concat(b);
    }, [])
    let loopNum = flatLines.length
    Object.keys(stepObj).map((key) => {
      if (obj[key][stepKey].indexOf('~') === 0) {
        if (obj[key][stepKey][line]) {
          let lineStr = obj[key][stepKey][line]
          if (lineStr.indexOf(':') > -1) {
            let lineArr = lineStr.split(':')
            if (typeof(lineArr[1]) === 'number') {
              let range = lineArr[0]
            } else {
              console.log("Loop not specified as a number.")
            }
          }
        }
      }
    })
    return loopNum
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
    let stepNum = Object.keys(rvObj)[0]
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
      }
    })
    let loopNum = this.countLoop(stepObj, lines)
    console.log(lines)
    //parseLEASH(rvObj, loopNum)

  }

  parseLEASH(obj, loopNum) {
    if (obj.file) {

    }
    if (obj.line) {

    }
    if (obj.mods) {

    }
  }

  combineSteps(stepsObj) {

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
          else if (b.length>2 || Number(b[0]) > Number(b[1])) {
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