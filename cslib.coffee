print = (msg...) ->
	console.log(msg)

###
print "I like cake", "so much"
###

after = (ms, fn) ->
	setTimeout(fn, ms)

###
after 50, ->
	console.log "50 ms passed!"
###

every = (ms, fn) ->
	setInterval(fn, ms)

###
every 300, ->
	console.log "another 300 seconds!"
###

times = (n, fn) ->
	while n
		n--
		fn()

###
times 6, ->
	console.log "called six times!"
###

once = (exp, fn, interval=1000) ->
	if exp()
		fn()
	else
		after interval, -> once(exp, fn)

###
class V
  constructor: (@a, @b) ->
  setB: (b) -> @b = b
  go: () -> 
	  once (=> @a == @b), ( => console.log "equal!")

v = new V(1,4)
v.go()
after 1000, ->
	v.setB(1)
###
###
t = false
once (-> t == true), ->
	console.log "yay"
after 3000, ->
	t = true
###

map = (a, fn) ->
	(fn(el) for el in a)

###
map ["a", "b"], console.log
###

reduce = (a, init, fn) ->
	s = init
	for el in a
		s = fn(s, el)
	return s

###
console.log( 
	reduce ["a", "b", "c"], "", (a,b)->a+b
)
###

String::startsWith = (s) ->
	this[...s.length] == s

String::endsWith = (s) ->
	this[this.length-s.length...] == s
