describe('template', function () {
    var app = window.app
    var template
    beforeEach(function () {
        template = new app.Template()
    })

    it('should have a default template', function () {
        expect(template.defaultTemplate).toEqual('<li data-id="{{id}}" class="{{completed}}"><div class="view"><input class="toggle" type="checkbox" {{checked}}><label>{{title}}</label><button class="destroy"></button></div></li>')
    })

    it('should render the template with items', function () {
        var view = template.show([{
            title: 'my todo',
            id: '1',
            completed: false
        }, {
            title: 'my todo2',
            id: '2',
            completed: true
        }])
        var viewItem1 = '<li data-id="1" class=""><div class="view"><input class="toggle" type="checkbox" ><label>my todo</label><button class="destroy"></button></div></li>'
        var viewItem2 = '<li data-id="2" class="completed"><div class="view"><input class="toggle" type="checkbox" checked><label>my todo2</label><button class="destroy"></button></div></li>'

        expect(view).toEqual(viewItem1 + viewItem2)
    })

    it('should render the number of active todos', function () {
        expect(template.itemCounter(3)).toEqual('<strong>3</strong> items left')
        expect(template.itemCounter(1)).toEqual('<strong>1</strong> item left')
    })

    it('should render "clear completed" button text', function () {
        expect(template.clearCompletedButton(0)).toEqual('')
        expect(template.clearCompletedButton(3)).toEqual('Clear completed')
    })
})