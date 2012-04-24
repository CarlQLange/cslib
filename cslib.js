var after, every, map, once, print, reduce, times,
  __slice = Array.prototype.slice;

print = function() {
  var msg;
  msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return console.log(msg);
};

/*
print "I like cake", "so much"
*/

after = function(ms, fn) {
  return setTimeout(fn, ms);
};

/*
after 50, ->
	console.log "50 ms passed!"
*/

every = function(ms, fn) {
  return setInterval(fn, ms);
};

/*
every 300, ->
	console.log "another 300 seconds!"
*/

times = function(n, fn) {
  var _results;
  _results = [];
  while (n) {
    fn();
    _results.push(n--);
  }
  return _results;
};

/*
times 6, ->
	console.log "called six times!"
*/

once = function(exp, fn, interval) {
  if (interval == null) interval = 1000;
  if (exp()) {
    return fn();
  } else {
    return after(interval, function() {
      return once(exp, fn);
    });
  }
};

/*
class V
  constructor: (@a, @b) ->
  setB: (b) -> @b = b
  go: () -> 
	  once (=> @a == @b), ( => console.log "equal!")

v = new V(1,4)
v.go()
after 1000, ->
	v.setB(1)
*/

/*
t = false
once (-> t == true), ->
	console.log "yay"
after 3000, ->
	t = true
*/

map = function(a, fn) {
  var el, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = a.length; _i < _len; _i++) {
    el = a[_i];
    _results.push(fn(el));
  }
  return _results;
};

/*
map ["a", "b"], console.log
*/

reduce = function(a, init, fn) {
  var el, s, _i, _len;
  s = init;
  for (_i = 0, _len = a.length; _i < _len; _i++) {
    el = a[_i];
    s = fn(s, el);
  }
  return s;
};

/*
console.log( 
	reduce ["a", "b", "c"], "", (a,b)->a+b
)
*/

String.prototype.startsWith = function(s) {
  return this.slice(0, s.length) === s;
};

String.prototype.endsWith = function(s) {
  return this.slice(this.length - s.length) === s;
};
