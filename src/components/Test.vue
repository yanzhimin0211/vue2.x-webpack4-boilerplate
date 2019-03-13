<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
        我是一个段落
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'HHHHH'
    }
},
methods: {
    handleClick: function() {
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }

            sayHello() {
                console.log(`Hello, my name is ${this.name}`);
            }
        }
        new Person('PersonName', 11).sayHello();
        const aa = Object.assign({name: 'xx'});
        console.log('>>>>', aa);
        console.log('bbccc');
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
    color: #000;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  background: url('../common/image/logo.png');
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: red;
}
</style>
