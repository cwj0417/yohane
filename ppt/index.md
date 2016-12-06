# FUNCTIONAL PROGRAMMING

## 什么是函数式编程?

+ 命令式(imperative)
+ 面向对象(object-oriented)
+ 函数式(functional)

---



### 函数式函数

**输入输出:**

一个变量被某个规律处理以后变成另外一个变量, 形如*f(x) = y*.

**非FP**:(命令式)

```js
let name = `Jin`;
let greeting = `Hi, I'm `;
console.log(greeting + name);
=> "Hi, I'm Jin"
```

**尝试: 把以上写成FP**

---


### 避免附加作用(side effect)

以下是错的:

```js
let name = `Jin`;
function greet() {
  console.log(`Hi, I'm ${name}`);
}
greet(name);
=> "Hi, I'm Jin"
```

正确的:

```js
function greet(name) {
  return `Hi, I'm ${name}`;
}
console.log(greet(`Jin`));
=> "hi, I'm Jin"
```

---


## FP的特性

### immutable data

错误的:

```js
let rooms = [`r1`, `r2`, `r3`];
rooms[2] = `r4`;
=> [`r1`, `r2`, `r4`]
```

正确的:

```js
let rooms = [`r1`, `r2`, `r3`];
let newRooms = rooms.map(rm => rm == `r3` ? `r4` : rm);
newRooms; ==> [`r1`, `r2`, `r4`]
rooms; ==> [`r1`, `r2`, `r3`];
```

*immutable.js*可以解决数据副本的问题.

---

### tail call optimisation/尾部调用优化

没优化的:

```js
let fact = function(num) {
  return num === 0 ? 1 : num * fact(--num);
}
```

尾调用:

```js
let fact = function(num) {
  let ft = function(num, accum) {
    return num === 0 ? accum : ft(num - 1, num * accum);
  }
  return ft(num, 1);
}
```

es6:

```js
let ft = function(num, accum = 1) {
  return num === 0 ? accum : ft(num - 1, num * accum);
}
```

---

## FP的优点

### lazy evaluation



![](imgs/lodash-naive.gif)



![](imgs/grafika.gif)



---


## 编写FP的技巧

### higher order functions

什么是高阶函数: 参数/返回值有函数.

---



#### map

map接受一个函数和一个集合. 然后创建一个新空集合, 在每个集合的元素上运行函数来插入空集合. 最后返回新的集合.

下面是个简单的获取名字长度的map:

```python
name_lengths = map(len, ["Mary", "Isla", "Sam"])
print name_lengths
# => [4, 4, 3]
```

下面是个返回元素平方的map:

```python
squares = map(lambda x: x * x, [0, 1, 2, 3, 4])
print squares
# => [0, 1, 4, 9, 16]
```

---



情景: **秘密行动中需要给特工分配代号**

```python
import random
names = ['Mary', 'Isla', 'Sam']
code_names = ['Mr. Pink', 'Mr. Orange', 'Mr. Blonde']
for i in range(len(names)):
    names[i] = random.choice(code_names)
print names
# => ['Mr. Blonde', 'Mr. Blonde', 'Mr. Blonde']
```

map:

```python
import random
names = ['Mary', 'Isla', 'Sam']
secret_names = map(lambda x: random.choice(['Mr. Pink',
                                            'Mr. Orange',
                                            'Mr. Blonde']),
                   names)
```



---



#### reduce

reduce接受一个函数和一个集合. 他返回的值是混合了输入的值.

下面是一个reduce. 他会返回输入集合的和.

```python
sum = reduce(lambda a, x: a + x, [0, 1, 2, 3, 4])
print sum
# => 10
```

---



**统计`Sam`出现的次数**

```python
sentences = ['Mary read a story to Sam and Isla.',
             'Isla cuddled Sam.',
             'Sam chortled.']
sam_count = 0
for sentence in sentences:
    sam_count += sentence.count('Sam')
print sam_count
# => 3
```

reduce:

```python
sentences = ['Mary read a story to Sam and Isla.',
             'Isla cuddled Sam.',
             'Sam chortled.']
sam_count = reduce(lambda a, x: a + x.count('Sam'),
                   sentences,
                   0)
```

注意第三个参数0, 代表初始值, 如果不设第一行的sam就丢了.

---



**尝试:  用map, reduce和filter重写以下代码. filter接受一个函数和一个集合, 返回所有经过函数返回`true`的元素的集合.**

```python
people = [{'name': 'Mary', 'height': 160},
    {'name': 'Isla', 'height': 80},
    {'name': 'Sam'}]
height_total = 0
height_count = 0
for person in people:
    if 'height' in person:
        height_total += person['height']
        height_count += 1
if height_count > 0:
    average_height = height_total / height_count
    print average_height
    # => 120
```

---

```python
people = [{'name': 'Mary', 'height': 160},
          {'name': 'Isla', 'height': 80},
          {'name': 'Sam'}]
heights = map(lambda x: x['height'],
              filter(lambda x: 'height' in x, people))
if len(heights) > 0:
    from operator import add
    average_height = reduce(add, heights) / len(heights)
```

---



#### map-reduce汉堡

![map-reduce-sandwich](imgs/mr.png)

+ map处理材料, reduce拼合材料
+ map: 把黄瓜处理了成黄瓜丝/条/片/任何形状, 并检查输入是否是黄瓜
+ reduce: 处理半成品, 按顺序放/捏在一起放/倒过来放
+ 如果想改变处理方式/拼合方式很容易
+ immutable

---

### currying

```js
let add = (a, b) => a + b;
add(1, 2);
add(1, 3);
add(1, 4);
```

```js
let add = (a, b) => a + b;
let add1 = function(b) {
  return add(1, b);
}
//default param
//let add1 = (a, b = 1) => a +  b;
add1(2);
add1(3);
add1(4);
```

更多的例子… ajax.post/get 类似的快捷方法. 提供常用的快捷方法.

---

柯里化的定义: 把一个函数中的某个可预期的变量固定, 从而产生一个新的函数.

当然这个固定的变量可以是函数. 所以以上的东西只是柯里化的一种应用场景..

柯里化的通项公式:

```js
let currying = function(fn, ...tails) {
  return function(...args) {
    return fn(...tails, ...args);
  }
}
//打比方, 上面的add1
let add = (a, b) => a + b;
let add1 = currying(add, 1);
add1(2);
add1(3);
```



---

## 实例一个

场景: 

> 3个小车赛跑, 共5阶段, 每阶段70%概率前进. 画出每阶段后的

类似输出:

```
 -
 - -
 - -

 - -
 - -
 - - -

 - - -
 - -
 - - -

 - - - -
 - - -
 - - - -

 - - - -
 - - - -
 - - - - -
```

---



代码:

```js
let time = 5;
let car_positions = [1,1,1];
while(time-- > 0) {
 car_positions = car_positions.map(each => Math.random() > 0.3 ? ++each : each);
  for(let each of car_positions) {
    console.log(`-`.repeat(each));
  }
  console.log(``);
}
```



---



**改进:** 把代码拆分成声明式的, 容易看懂.

---



```js
function move_cars() {
  car_positions = car_positions.map(each => Math.random() > 0.3 ? ++each : each);
}
function draw_car(car_position) {
  console.log(`-`.repeat(car_position));
}
function run_step_of_race() {
  time--;
  move_cars();
}
function draw() {
  console.log(``);
  for(let each of car_positions) {
    draw_car(each);
  }
}
let time = 5;
car_positions = [1, 1, 1];
while(time > 0) {
  run_step_of_race();
  draw();
}
```

*只要从主程序开始看, 函数名自解释, 想看哪个函数实现再看函数就可以*



---

**改进:** 去除状态 — 带状态方法与环境与其他方法耦合

---



```js
function move_cars(car_positions) {
  return car_positions.map(each => Math.random() > 0.3 ? ++each : each);
}
function output_car(car_positions) {
  return `-`.repeat(car_positions);
}
function run_step_of_race({time, car_positions}) {
  return {
    time: --time,
    car_positions: move_cars(car_positions)
  }
}
function draw({car_positions}) {
  console.log(``);
  console.log(car_positions.map(output_car).join(`\n`));
}
function race(state) {
  draw(state);
  if(state.time > 0) {
    race(run_step_of_race(state));
  }
}
race({
  time: 5,
  car_positions: [1, 1, 1]
})
```



---

场景:

> 检查一个字符串是否符合规则

检查函数:

```js
function zero([s, ...rest]) {
  return s === "0" ? rest.join("") : false;
}
function one([s, ...rest]) {
  return s === "1" ? rest.join("") : false;
}
```

调用:

```js
function rule_sequence(s, rules) {
  for(let rule of rules) {
    s = rule(s);
    if(!s) 
      break;
  }
  return s;
}
console.log(rule_sequence("0101", [zero, one, zero]));
console.log(rule_sequence("0101", [zero, zero]));
```

---

**改进:** 把`rule_sequence()`方法改成递归.

---



```js
function rule_sequence(s, [headRule, ...restRule]) {
  return (!s || !headRule) ? s : rule_sequence(headRule(s), restRule);
}
```

---

场景:

> 对一些品牌信息进行某些规则的批量处理

```js
let bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': false},
         {'name': 'women', 'country': 'Germany', 'active': false},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': true}];
function format_bands(bands) {
  return bands.map((band) => {
    band['country'] = 'Canada';
    band['name'] = band['name'].replace('.', '');
    band['name'] = band['name'].toUpperCase();
    return band;
  })
}
bands = format_bands(bands);
console.log(bands);
```

---

**改进:**  改成pile形式. 容易复用与拓展.

目标:

```js
console.log(pipeline_each(bands, [set_canada_ascountry,
                                 strip_punctuation_from_name,
                                 uppercase_name]));
```

---

```js
function clone(t) {
  let ret = {};
  for(let key in t) {
    ret[key] = t[key];
  }
	return ret;
}
function assoc(_d, key, value) {
  let d = clone(_d);
  d[key] = value;
  return d;
}
function set_canada_ascountry(band) {
  return assoc(band, 'country', 'Canada');
}
function strip_punctuation_from_name(band) {
  return assoc(band, 'name', band.name.replace('.', ''));
}
function uppercase_name(band) {
  return assoc(band, 'name', band.name.toUpperCase());
}
```

```js
function pipeline_each(data, fns) {
  return fns.reduce((a, x) => a.map(x), data);
}
```

---

**改进:** 我们发现3个辅助函数都是对第一个参数的某个字段做处理, 柯里化为`call()`来一起处理.

---



```js
function call(fn, key) {
  return function(record) {
    return assoc(record, key, fn(record[key]));
  }
}
console.log(pipeline_each(bands, [call(x => 'Canada', 'country'),
                                 call(x => x.replace('.', ''), 'name'),
                                 call(x => x.toUpperCase(), 'name')]));
```

---

**加需求了:** 抽出name和country字段.

---



```js
function extract_name_and_country(band) {
  let plucked = {};
  plucked['name'] = band['name'];
  plucked['country'] = band['country'];
  return plucked;
}
console.log(pipeline_each(bands, [call(x => 'Canada', 'country'),
                                 call(x => x.replace('.', ''), 'name'),
                                 call(x => x.toUpperCase(), 'name'),
                                 extract_name_and_country]));
```

---

**改进:** 抽出`pluck()`方法, 目标:

```js
console.log(pipeline_each(bands, [call(x => 'Canada', 'country'),
                                 call(x => x.replace('.', ''), 'name'),
                                 call(x => x.toUpperCase(), 'name'),
                                 pluck(['name', 'country'])]));
```

---

```js
function pluck(keys) {
  return function(record) {
    return keys.reduce((a, x) => assoc(a, x, record[x]), {});
  }
}
```

---

# 完了