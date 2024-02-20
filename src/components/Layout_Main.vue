<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        app
        fixed
        :dark="darkTheme"
        :width="menuWidth"
        :color="sideBackColor"
        >
        <v-toolbar
        :color="logoBackColor"
        :dark="darkTheme"
        :prominent="prominentLogo"
        
      >
      <v-icon color="black" class="text-center" size="140" style="margin-left:61px;margin-top:-10px;">mdi-account-tie</v-icon>
      </v-toolbar>

      <v-list dense expand class="mt-12" :dark="darkTheme" shaped>
        <template v-for="(item,i) in menus">
            <v-list-group
            
            v-if="item.items"
            :key="item.name"
            :prepend-icon="item.icon"
            :active-class="darkTheme ? 'white--text' : ''"
            >

            <template v-slot:activator>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </template>
            
            </v-list-group>

            <v-subheader v-else-if="item.header" :key="i">{{
            item.header
          }}</v-subheader>

          
          <v-divider v-else-if="item.divider" :key="i" />
          <!-- Top Level-->
          <v-list-item
            
            v-else
            :key="item.name"
            :disabled="item.disabled"
            :href="item.href"
            :target="item.target"
            :to="!item.href ? { name: item.name } : null"
          >
            <v-list-item-icon v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-body-2">{{ item.title }}</v-list-item-title>
            
          </v-list-item>

        </template>
      </v-list>
        </v-navigation-drawer>

    <v-app-bar app :dark="appBarDark" :color="appBarColor">
      <v-btn icon color="accent" @click.stop="drawer = !drawer">
        <v-icon style="color: white">{{
          drawer ? "mdi-chevron-double-left" : "mdi-chevron-double-right"
        }}</v-icon>
      </v-btn>
      <v-toolbar-title
        v-if="$vuetify.breakpoint.smAndDown"
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down font-weight-thin" style="color: white"
          >Administración de Usuarios</span
        >
      </v-toolbar-title>
      <v-spacer />
   
      <v-menu
        v-model="userMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        ripple="false"
      >
      
        <template v-slot:activator="{ on }">
          <v-btn class="elevation-0 text-capitalize" text v-on="on">
            <v-avatar color="primary" size="36" class="mr-2">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
            {{ user.name }}
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="primary">
            <v-list dense class="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="white--text title">
                    {{ user.name }}
                  </v-list-item-title>
                  
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-title>

          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-settings-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>

            

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon dark color="red">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <div class="page-wrapper">
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </div>
    </v-main>


    <v-row justify-md="center">
      <v-col cols="12" md="6" offset-md="3">
        <v-icon size="250" color="primary">mdi-account-group</v-icon>
      </v-col>
      <v-col cols="12" md="6">
        <span class="text-h2">Administración de Usuarios</span>
      </v-col>

    </v-row>
    </div>
</template>

<script>
import menu from '../utils/menu';
export default {
    name: "Layout",
    data: () => ({
        drawer: null,
        darkTheme: true, // Tema obscuro ( letras en blanco en caso de colores obscuros de la barra lateral)
        appBarColor: "#458cc7", // Color de la barra principal de la app
        appBarDark: true, // Tema obscuro ( letras en blanco en caso de colores obscuros de la barra princip
        contrasena: false,
        user: [],
        userMenu: false,
        menus: menu,
        menuWidth: 325, // Ancho de la barra lateral principal
        prominentLogo: true, // Logo pequeño o Grande
        logoBackColor: "#458cc7", // Color de fondo para el logo de la barra lateral
        sideBackColor: "#326793", // Color de fondo de la barra lateral
        rol: null
    }),
    methods:{
      getUser(){
        this.user = this.$route.params.data;
      },
      logout(){
        this.$axios.post('logout')
            .then(response => {
                console.log(response.data.message);
                 this.$router.push('/');
            })
            .catch(error => {
                
                console.error('Error durante el logout:', error);
            });
      }
    },
    mounted(){
        console.log(this.menus);
        this.getUser();
    }
}

</script>

<style>


</style>