<template>
  <f7-page name="home">
    <f7-navbar bg-color="lightblue" text-color="white">
      <f7-nav-title> <f7-icon f7="home"></f7-icon>&nbsp; Home</f7-nav-title>
    </f7-navbar>

    <!-- Page content -->
    <f7-card>
      <f7-list>
        <f7-list-item
          title="10 Maxims"
          link="/maxims/"
          no-chevron
        ></f7-list-item>

        <f7-list-item title="Abhyaas / Practice" link="/practice/" no-chevron>
        </f7-list-item>

        <f7-list-item
          title="A E I O U of Spirituality"
          link="/aeiou/"
          no-chevron
        ></f7-list-item>
      </f7-list>
    </f7-card>
  </f7-page>
</template>
<script>
export default {};
</script>
