# cslib
`cslib` is a small utilities library that I wrote when I began using coffeescript. Most of it is just sugar, like the `after` and `every` functions, which are just wrappers for `setTimeout` and `setInterval`, switching the order of the arguments. There are a couple of other functions that I've found really handy, especially `once`.

`once` is this great little function to prevent dealing with a big eventing architecture. One of javascript's biggest flaws, and one that people love to whinge about, is the way that you need callbacks for basically everything. This is a nice little shim to prevent that (even though it's pretty much the exact opposite of best practices.)

`once` looks like this:

    once = (exp, fn) ->
        if exp()
            fn()
        else
            after 1000, -> once(exp, fn)

So, in English, `once` evaluates the expression `exp`, and if that's true, runs `fn`. If it's not, it calls `once` again a second later.

Usage looks like this:

    t = false

    once (-> t == true), ->
        console.log "yay"
    
    after 3000, ->
        t = true

So, once `t` is true, this bit of code outputs "yay". Neat, right? I think so.

I've been meaning to fork CoffeeScript and repurpose the `when` keyword for this, then send a pull request. I think it would be an interesting digression into compilers and the like, but I haven't gotten around to it just yet.
The point of that would be so I could write it like this:

    when t is true
        console.log "yay"

making it a wonderfully succint and legible bit of code.

I also stole the `times` convention from Ruby, so now I can write

    times 6, ->
        console.log "cake"

This logs "cake" six times.
In Ruby, you write that as 
    
    6.times do
        puts "cake"
    end

While it's not quite as nice as the Ruby version, I could also write it as a function of Number, something like:

    Number::times = (fn) ->
        n = this
        while n
            fn()
            n--

This, by the way, is the nicest usage of the double-colon operator I've ever seen in a language. While it's extremely similar to JavaScript (`Number::times` just compiles to `Number.prototype.times`), it's a really nice way to write that.

In summary, `cslib` is a little sugar to make CoffeeScript just a little bit more like Python.

*For full usage examples, just read the cslib.coffee file!*
