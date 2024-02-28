json = { "items": [{ "items": [{ "items": [{ "items": [{ "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text", { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }, { "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }
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
// recurrsiveは自身の中でストップ、コンティニューを実行しないといけない
function tree2string(j) {
    let a = []
    if (j.selectTag == undefined) {
        // do nothing
        //console.log('The root of json should have selectTag')
    } else {
        let flag = false
        for (let i = 0; i < j.items[0].items.length; i++) {
            //console.log(j.items[0].items[i])
            if (j.items[0].items[i].selectTag == undefined) {
                //console.log('selectTag undefined')
            } else {
                //console.log('selectTag defined')
                a.push(i)
                flag = true
            }
        }
        if (flag == false) {
            console.log('ready to merge')
            console.log(j)
            console.log(trimBySelect(j))
            //console.log(trimBySelect(j))
            //return trimBySelect(j)
        } else {
            //console.log('not ready to merge. going deeper')
            for (let i = 0; i < a.length; i++) {
                tree2string(j.items[0].items[i])
            }
        }
    }
}
// 下記の通り、計算すればうまくはゆく
json = { "items": [{ "items": [{ "items": [{ "items": [{ "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text", { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }, { "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }
json.items[0].items[0].items[0].items[1].items[0].items[1] = trimBySelect(json.items[0].items[0].items[0].items[1].items[0].items[1])
// -> '{"items":[{"items":[{"items":[{"items":[{"items":[{"items":["text","text","text"]}],"selectTag":"and"},{"items":[{"items":["text","text"]}],"selectTag":"and"},{"items":[{"items":["text","text","text"]}],"selectTag":"and"},"text","text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[0].items[0].items[0] = trimBySelect(json.items[0].items[0].items[0].items[0])
// -> '{"items":[{"items":[{"items":[{"items":["(text and text and text)",{"items":[{"items":["text","text"]}],"selectTag":"and"},{"items":[{"items":["text","text","text"]}],"selectTag":"and"},"text","text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[0].items[0].items[1] = trimBySelect(json.items[0].items[0].items[0].items[1])
// -> '{"items":[{"items":[{"items":[{"items":["(text and text and text)","(text and text)",{"items":[{"items":["text","text","text"]}],"selectTag":"and"},"text","text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[0].items[0].items[2] = trimBySelect(json.items[0].items[0].items[0].items[2])
// -> '{"items":[{"items":[{"items":[{"items":["(text and text and text)","(text and text)","(text and text and text)","text","text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[0] = trimBySelect(json.items[0].items[0])
// -> '{"items":[{"items":["((text and text and text) and (text and text) and (text and text and text) and text and text)",{"items":[{"items":["text"]}],"selectTag":"and"},{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[1] = trimBySelect(json.items[0].items[1])
// -> '{"items":[{"items":["((text and text and text) and (text and text) and (text and text and text) and text and text)","text",{"items":[{"items":["text"]}],"selectTag":"and"}]}],"selectTag":"and"}'
json.items[0].items[2] = trimBySelect(json.items[0].items[2])
// -> '{"items":[{"items":["((text and text and text) and (text and text) and (text and text and text) and text and text)","text","text"]}],"selectTag":"and"}'
json = trimBySelect(json)
// -> '"(((text and text and text) and (text and text) and (text and text and text) and text and text) and text and text)"'
a = { items: [{ items: [{ items: [{ items: [{ items: [1] }] }] }] }] }
o = a
o = o.items[0]
o = o.items[0]
o = o.items[0]
o = o.items[0]
o // {items:[1]}
a // {items:[{items:[{items:[{items:[{items:[1]}]}]}]}]}
// -> so a and o are not related

json = { "items": [{ "items": [{ "items": [{ "items": [{ "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text", { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }, { "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }, "text", "text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }, { "items": [{ "items": ["text"] }], "selectTag": "and" }] }], "selectTag": "and" }
selectArr = []
function tree2string(j, loc) {
    let l = [...loc] // {...j}
    let a = []
    if (j.selectTag == undefined) {
        // do nothing
        //console.log('The root of json should have selectTag')
    } else {
        let flag = false
        for (let i = 0; i < j.items[0].items.length; i++) {
            //console.log(j.items[0].items[i])
            if (j.items[0].items[i].selectTag == undefined) {
                //console.log('selectTag undefined')
            } else {
                //console.log('selectTag defined')
                a.push(i)
                flag = true
            }
        }
        if (flag == false) {
            console.log('ready to merge')
            console.log(j)
            //console.log(trimBySelect(j))
            //console.log(trimBySelect(j))
            //return trimBySelect(j)
            //selectArr.push({loc:l})
            console.log(l)
            //console.log(l)
        } else {
            //console.log('not ready to merge. going deeper')
            for (let i = 0; i < a.length; i++) {
                //tree2string(j.items[0].items[a[i]],l.push(a[i]))
                //l.push(i)
                l.push(a[i])
                // console.log(l)
                tree2string(j.items[0].items[i],l)
            }
        }
    }
}
tree2string(json,[])

// simple tree 
json = { "items": [{ "items": ["text", "text", "text"] }], "selectTag": "and" }
tree2string(json)
json // obj