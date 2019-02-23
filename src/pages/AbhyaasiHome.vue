<template>
  <f7-page name="home">
    <f7-navbar bg-color="lightblue" title="Home" text-color="white">
      <span href="#" slot="nav-left">
        <f7-icon f7="home" slot="nav-left" style="padding:10px;"></f7-icon>
      </span>
    </f7-navbar>
    <!-- Page content -->
    <f7-card>
      <f7-list>
        <f7-list-item
          title="10 Maxims"
          link="/maxims/"
          no-chevron
        ></f7-list-item>

        <f7-list-item
          title="Abhyaas / Practice"
          target="true"
          link="/practice/"
          no-chevron
        >
        </f7-list-item>

        <f7-list-item
          title="A E I O U of Spirituality"
          link="/aeiou/"
          target="true"
          no-chevron
        ></f7-list-item>
      </f7-list>
    </f7-card>
  </f7-page>
</template>
<script>
export default {};
</script>
