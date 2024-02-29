json = { "items": [{ "items": [{ "items": [{ "items": [{ "items": [{ "items": ["text-0-0", "text-0-0", "text-0-0"] }], "selectTag": "and" }, { "items": [{ "items": ["text-0-1", { "items": [{ "items": ["text-0-1-1"] }], "selectTag": "and" }] }], "selectTag": "and" }, { "items": [{ "items": ["text-0-2", "text-0-2"] }], "selectTag": "and" }, "text-0", "text-0", "text-0", "text-0"] }], "selectTag": "and" }, { "items": [{ "items": ["text-1", "text-1"] }], "selectTag": "and" }, { "items": [{ "items": ["text-2"] }], "selectTag": "and" }] }], "selectTag": "and" }
//simple tree
//json = { "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }
function trimBySelect(j) {
  if (j.selectTag == undefined) { //
  } else { // incl selectTag
    if (j.items[0].items.length == 1) {
      return j.items[0].items[0]
    } else {
      return '(' + j.items[0].items.join(' ' + j.selectTag + ' ') + ')'
    }
  }
}
function getTrimmablePosition(j, loc) {
  let l = [...loc]
  let a = {}
  if (j.selectTag == undefined) {
    // do nothing
  } else {
    let flag = false
    for (let i = 0; i < j.items[0].items.length; i++) {
      if (j.items[0].items[i].selectTag == undefined) {
        a[i]=''
      } else {
        a[i]=i
        flag = true
      }
    }
    if (flag == false) {
      //console.log(trimBySelect(j))
      selectArr.push(l)
    } else {
      for (let i = 0; i < j.items[0].items.length; i++) {
        if (j.items[0].items[i].selectTag == undefined) {
        } else {
          l.push(a[i])
          let jj = { ...j.items[0].items[a[i]] }
          getTrimmablePosition(jj, l)
          l.pop()
        }
      }
    }
  }
}
function trimmer(o, a) {
  if (a.length == 0) {
    // return
    o = trimBySelect(o)
  } else if (a.length == 1) {
    o.items[0].items[a[0]] = trimBySelect(o.items[0].items[a[0]])
  } else if (a.length == 2) {
    o.items[0].items[a[0]].items[0].items[a[1]] = trimBySelect(o.items[0].items[a[0]].items[0].items[a[1]])
  } else if (a.length == 3) {
    o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]] = trimBySelect(o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]])
  } else if (a.length == 4) {
    o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]] = trimBySelect(o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]])
  } else if (a.length == 5) {
    o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]].items[0].items[a[4]] = trimBySelect(o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]].items[0].items[a[4]])
  } else if (a.length == 6) {
    o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]].items[0].items[a[4]].items[0].items[a[5]] = trimBySelect(o.items[0].items[a[0]].items[0].items[a[1]].items[0].items[a[2]].items[0].items[a[3]].items[0].items[a[4]].items[0].items[a[5]])
  } else {
    return
  }
  return o
}
selectArr = [] // initialize

//getTrimmablePosition(json, [])
let flag = true
while(flag) {
  getTrimmablePosition(json, []) // push locationp[i0,i2] to selectArr[[],[]]
  if (JSON.stringify(selectArr) == '[[]]') { // selectArr.length == 0
    //trimmer(json, [])
    flag = false
  } else {
    for (let i = 0; i < selectArr.length; i++) {
      trimmer(json, selectArr[i])
    }
    selectArr=[]
  }
}
trimmer(json, [])