describe('store', function() {
    var storage
    beforeEach(function() {
        delete localStorage.storeSpecs
        storage = new app.Store('storeSpecs')
    })

    it ('should create a store', function() {
        delete localStorage.storeTest
        var newStore = new app.Store('storeTest')

        expect('storeTest' in localStorage).toBe(true)
    })

    var currentId = 0

    function addTodo(todo) {
        todo = todo || {title: 'my todo', completed: false, id: currentId++}
        var storing = JSON.parse(localStorage.storeSpecs)
        storing.todos.push(todo)
        localStorage.storeSpecs = JSON.stringify(storing)
    }

    function addTodos(count) {
        for (var i = 0; i < count; i++) {
            addTodo()
        }
    }

    it ('should drop store', function() {
        var data = {todos: []}
        addTodo()
        storage.drop(function() {})

        expect(JSON.parse(localStorage.storeSpecs)).toEqual(data)
        expect(parseInt(localStorage.storeSpecs_lastId)).toEqual(0)
    })
        
    it ('should find all items', function() {
        addTodos(3)
        var foundTodos
        storage.findAll(function(todos) {
            foundTodos = todos
        })

        expect(foundTodos.length).toEqual(3)
    })
})