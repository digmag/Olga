let Router = {

    routers: {
        "/:id": "InitPosts",
        "/login": "InitLogin",
        "/post/:id":"InitDetail"
    },
    init: function(){
        this._routes = [];
        for( let route in this.routes ) {
            let method = this.routes[route];
            this._routes.push({
                pattern: new RegExp('^' + route.replace(/:\w+/g,'([\\w+\-]+)') + '$'),
                callback: this[method]
            });

        }
    },

    dispatch: function(path) {
        var i = this._routes.length;
        while( i-- ) {
            var args = path.match(this._routes[i].pattern);
            if( args ) {
                this._routes[i].callback.apply(this,args.slice(1))
                history.pushState({}, null, path);
                break;
            }
        }
    },

    InitLogin: function(){
        $.get('../html/index.html', function (data){
            window.location.href = "localhost/html/index.html"
        })
    },

    InitPosts: function (id){
        $.get( "../index.html", function( data ) {
            console.log(data);
        });
    }
};