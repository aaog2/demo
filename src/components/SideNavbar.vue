<template>
  <div>
    <!-- side navbar -->
    <div class="sidebars bg-white">
      <nav class="nav flex-column pt-3">
        <router-link class="nav-link sides py-3" to="/">
          <font-awesome-icon icon="fa-solid fa-users" size="lg" />
        </router-link>
        <!-- <router-link class="nav-link sides py-3" to="/searchpage">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" />
                </router-link> -->
        <router-link class="nav-link sides py-3" to="/doe">
          <font-awesome-icon icon="fa-solid fa-file" size="lg" />
        </router-link>
        <!-- <router-link class="nav-link sides py-3" to="/returnworker">
                  <font-awesome-icon icon="person-walking-arrow-loop-left" size="lg" />
                </router-link> -->
        <router-link class="nav-link sides py-3" to="/register">
          <font-awesome-icon icon="fa-solid fa-user-plus" size="lg" />
        </router-link>
        <router-link class="nav-link sides py-3" to="/reviewcv">
          <font-awesome-icon icon="fa-solid fa-user-check" size="lg" />
        </router-link>
        <router-link class="nav-link sides py-3" to="/reviewworker">
          <font-awesome-icon icon="fa-solid fa-list-check" size="lg" />
        </router-link>
        <router-link class="nav-link sides py-3" to="/reviewmedical">
          <font-awesome-icon
            icon="fa-solid fa-house-medical-circle-check"
            size="lg"
          />
        </router-link>
        <router-link class="nav-link sides py-3" to="/passport">
          <font-awesome-icon icon="fa-solid fa-passport" size="lg" />
        </router-link>
        <router-link class="nav-link sides py-3" to="/contract">
          <font-awesome-icon icon="fa-solid fa-file-contract" size="lg" />
        </router-link>
        <router-link class="nav-link sides py-3" to="/owic">
          <font-awesome-icon icon="fa-solid fa-address-card" size="lg" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
// import router from '@/router';

export default {
  name: "SideNavbar",
};
</script>

<style>
.navbar-brand img {
  margin-left: 0.5rem;
  width: 40px !important;
  height: 40px !important;
}

.logo_container img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dd00ff;
  border: 2px solid #9900ff;
}
</style>
