<template>
    <v-btn
      color="primary">
      Изменить
      <v-menu activator="parent">
        <v-list>
        <v-list-item>
          <v-btn @click="$emit('edit', 'editing')"> Редактировать </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="$emit('edit', 'delete')"> Удалить </v-btn>
        </v-list-item>
      </v-list>
      </v-menu>
    </v-btn>
</template>
<script>
    export default{
        emits: ['edit']
    }
</script>
