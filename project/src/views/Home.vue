<template>
  <div class="home">
    <router-link tag="article" to="/mood/happinesslist">
      <img src="../assets/img/happiness.jpg" alt="">
    </router-link>
    <router-link tag="article" to="/mood/regretlist">
      <img src="../assets/img/regret.jpg" alt="">
    </router-link>
      
    <router-link tag="article" to="/mood/gratitudelist">
      <img src="../assets/img/gratitude.jpg" alt="">
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .home {
    height: 100%;
    display: flex;
    justify-content: space-between;
    article {
      box-shadow: 0 0 1px 1px grey;
      position: relative;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    article:nth-child(1) {
      
      // background-image: url('../assets/img/happiness.jpg');
      // background-size: 100% 100%;
      
      transition: all 0.5s linear;
      &:hover {
        
        transform: scale(1.5);
        &::after {
          height: 0;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        transition: all 0.5s linear;
      }
    }
    
    article:nth-child(2) {
      // background-image: url('../assets/img/regret.jpg');
      // background-size: 100% 100%;
      
      transition: all 0.5s linear;
      &:hover {
        
        transform: scale(1.5);
        &::after {
          height: 0;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        transition: all 0.5s linear;
      }
    }

    article:nth-child(3) {
      // background-image: url('../assets/img/gratitude.jpg');
      // background-size: 100% 100%;
      
      transition: all 0.5s linear;
      &:hover {
        
        transform: scale(1.5);
        &::after {
          height: 0;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        transition: all 0.5s linear;
      }
    }
  }
</style>
