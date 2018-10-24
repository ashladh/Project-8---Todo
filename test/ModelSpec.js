describe('model', function() {
    var storage
    var model
    beforeEach(function() {
        storage = new app.Store('modelSpecs')
        storage.drop(function(){})
        model = new app.Model(storage)
    })

    function findAll() {
        var items
        storage.findAll(function(_items) {
            items = _items
        })
        return items
    }

    it('should create an item', function() {
        model.create('my todo')
        var items = findAll()
        expect(items.length).toEqual(1)
        expect(items[0].title).toEqual('my todo')
    })

    it('should remove an item', function() {
        model.create('my todo')
        var items = findAll()
        model.remove(items[0].id, function() {})
        items = findAll()
        expect(items.length).toEqual(0)
    })

    it('should remove all items', function() {
        model.create('my todo1')
        model.create('my todo2')
        model.create('my todo3')
        model.removeAll(function() {})
        var items = findAll()
        expect(items.length).toEqual(0)
    })

    it('should update an item', function() {
        model.create('my todo')
        var items = findAll()
        var id = items[0].id
        model.update(id, {completed: true})
        items = findAll()
        expect(items[0].completed).toBe(true)
    })

})