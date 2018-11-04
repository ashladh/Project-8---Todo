describe('store', function () {
    var app = window.app
    var storage
    var currentId = 0

    beforeEach(function () {
        currentId = 0
        delete localStorage.storeSpecs
        delete localStorage.storeSpecs_lastId
        storage = new app.Store('storeSpecs')
    })

    it('should create a store', function () {
        delete localStorage.storeTest
        new app.Store('storeTest')

        expect('storeTest' in localStorage).toBe(true)
    })

    function addTodo (todo) {
        todo = todo || {title: 'my todo' + currentId, completed: false, id: currentId++}
        var storing = JSON.parse(localStorage.storeSpecs)
        storing.todos.push(todo)
        localStorage.storeSpecs = JSON.stringify(storing)
    }

    function addTodos (count) {
        for (var i = 0; i < count; i++) {
            addTodo()
        }
    }

    it('should drop store', function () {
        var data = {todos: []}
        addTodo()
        storage.drop(function () {})

        expect(JSON.parse(localStorage.storeSpecs)).toEqual(data)
        expect(parseInt(localStorage.storeSpecs_lastId, 10)).toEqual(0)
    })
        
    it('should find all items', function () {
        addTodos(3)
        var foundTodos
        storage.findAll(function (todos) {
            foundTodos = todos
        })

        expect(foundTodos.length).toEqual(3)
    })

    it('should get the last id', function () {
        expect(storage.getLastId()).toEqual(0)
        localStorage.storeSpecs_lastId = 1
        expect(storage.getLastId()).toEqual(1)
    })

    it('should create the next id', function () {
        localStorage.storeSpecs_lastId = 1
        expect(storage.createNextId()).toEqual(2)
    })

    it('should find an item based on a query', function () {
        addTodos(3)
        var foundItem
        storage.find({title: 'my todo2'}, function (items) {
            foundItem = items[0]
        })
        expect(foundItem.title).toEqual('my todo2')
    })

    it('should save a new item', function () {
        storage.save({title: 'my new todo', completed: true})
        var items = JSON.parse(localStorage.storeSpecs).todos
        expect(items.length).toEqual(1)
        expect(items[0].title).toEqual('my new todo')
        expect(items[0].completed).toBe(true)
        expect(items[0].id).toEqual(1)
    })

    it('should update an item', function () {
        storage.save({title: 'my new todo', completed: true})
        storage.save({title: 'my updated todo'}, null, 1)
        var items = JSON.parse(localStorage.storeSpecs).todos
        expect(items.length).toEqual(1)
        expect(items[0].title).toEqual('my updated todo')
        expect(items[0].id).toEqual(1)
    })

    it('should remove an item', function () {
        addTodos(3)
        storage.remove(1, function () {})
        var items = JSON.parse(localStorage.storeSpecs).todos
        expect(items.length).toEqual(2)
        for (var i = 0; i < items.length; i++) {
            expect(items[i].id).not.toEqual(1)
        }
    })
})