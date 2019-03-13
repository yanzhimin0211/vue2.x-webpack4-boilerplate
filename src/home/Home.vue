<template>
    <div class="home" @click="handleClick">
      我是home页面
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'home'
    }
  },
  methods: {
    handleClick: function() {
        console.log('home');
      class Person {
        constructor(name, age) {
          this.name = name;
          this.age = age;
        }

        sayHello() {
          console.log(`He, my name is ${this.name}`);
        }
      }
      new Person('PersonName', 11).sayHello();
      const aa = Object.assign({
        name: 'xx'
      });
      console.log('>>>>', aa);
      console.log('bbccc');
    }
  }
}
</script>

<style>
.home {
  color: red;
}
</style>
