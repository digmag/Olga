let Router = {

    routes: {
        "/:id": "InitMovies",
        "/login": "InitAuthorization",
        "/registration": "InitRegistration",
        "/post/:id": "InitDetails",
        "/favorites": "InitFavorites",
        "/profile": "InitProfile"
    },

    init: function() {
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
        console.log(path);
        while( i-- ) {
            var args = path.match(this._routes[i].pattern);
            if( args ) {
                this._routes[i].callback.apply(this,args.slice(1))
                history.pushState({}, null, path);
                break;
            }
        }
    },

    InitMovies: function(id) {
        $.get( "../html/movies.html", function( data ) {
            $( ".container" ).html( data );
            updatePage();
            $('#movies-part').css("color", "#0a58ca");
            $('#movies-part').css("color", "#0a58ca");
            $('#movie-container').removeClass('d-none');
            $('.page-list').removeClass("d-none");
            loadMovies(id);
        });
        
    },

    InitAuthorization: function() {
        $.get( "../html/index.html", function( data ) {
            console.log(data);
            $( ".container" ).html( data );
            updatePage();
            $('#login-part').css("color", "#0a58ca");
            $('.authorization').removeClass("d-none");
            loadAuth();
        });
        
    },

    InitRegistration: function() {
        $.get( "../html/registration.html", function( data ) {
            $( ".container" ).html( data );
            updatePage();
            $('#reg-part').css("color", "#0a58ca");
            $('.registration').removeClass('d-none');
            loadReg();
        });
        
    },

    InitDetails: function(id) {
        $.get( "../html/movieDetail.html", function( data ) {
            $( ".container" ).html( data );
            loadDetails(id);
        });
    },

    InitFavorites: function() {
        $.get( "../html/favorites.html", function( data ) {
            $( ".container" ).html( data );
            updatePage();
            $('#favorites-container').removeClass('d-none');
            $('#favors-part').css("color", "#0a58ca");
            loadFavorites();
        });
        
       
    },
    
    InitProfile: function() {
        $.get( "../html/profile.html", function( data ) {
            $( ".container" ).html( data );
            updatePage();
            $('.profile').removeClass('d-none');
            $('#profile-part').css("color", "#0a58ca");
            loadProfile();
        });
    }
}