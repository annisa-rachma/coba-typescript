import ListItem from "./ListItem";

interface List {
    list : ListItem[],
    load() : void,
    save() : void,
    clearList() : void,
    addItem(itemObj: ListItem) : void,
    removeItem(id: string) : void
}

export default class FullList implements List {

    static instance : FullList = new FullList()

    private constructor( private _list : ListItem[] = []){}

    get list() : ListItem[] {
        return this._list
    }

    load(): void {
        //get list item dari local storage
        const storedList : string | null = localStorage.getItem('myList')
        if(typeof storedList !== 'string') return
        //type guard
        //karena sebelumnya sudah di stringify ketika set ke localstorage

        //created new item from parsedList ?
        const parsedlist : { _id : string, _item : string, _checked : boolean }[] = JSON.parse(storedList)

        parsedlist.forEach( itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    //set ke localstorage 
    save() : void {
        localStorage.setItem('myList', JSON.stringify(this._list))
    }


    //clear to do list
    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}