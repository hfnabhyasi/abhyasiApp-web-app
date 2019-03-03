<template>
  <f7-page name="home">
    <f7-navbar
      bg-color="lightblue"
      title="Home"
      text-color="white"
    >
      <span
        slot="nav-left"
        href="#"
      >
        <f7-icon
          slot="nav-left"
          f7="home"
          style="padding:10px;"
        />
      </span>
    </f7-navbar>
    <!-- Page content -->
    <f7-card class="theme-dark">
      <pre>
          {{ $store.state }}
      </pre>
    </f7-card>

    <f7-card>
      <f7-list>
        <f7-list-item
          title="10 Maxims"
          link="/maxims/"
          no-chevron
        />

        <f7-list-item
          title="Abhyaas / Practice"
          target="true"
          link="/practice/"
          no-chevron
        />

        <f7-list-item
          title="A E I O U of Spirituality"
          link="/aeiou/"
          target="true"
          no-chevron
        />
      </f7-list>
    </f7-card>
  </f7-page>
</template>
<script>
export default {};
</script>

<style media="screen">
  .dev-card {
    max-height: 300px;
    overflow: auto;
  }
</style>
