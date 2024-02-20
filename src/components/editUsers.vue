<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="9" class="mt-8">
                    <v-card>
                        <v-card-title>
                            Editar Usuario
                            <v-spacer></v-spacer>
                            <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar Solicitudes"
                            single-line
                            hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table :search="search" :headers="headers" :items="users">
                        <template v-slot:item.actions="{ item }">
                            <v-icon @click="editUser(item)" class="mr-2" style="color:green">mdi-pencil</v-icon>
                            <v-icon @click="deleteUser(item)" style="color:red;">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="editScreen" max-width="850" persistent>
            <v-card>
                <v-app-bar dark color="primary">
                <v-toolbar-title class="title font-weight-light">
                    <v-avatar size="50">
                    <v-icon>mdi-pencil</v-icon>
                    </v-avatar>
                    <span style="font-size: 22px"> Editar Usuario</span>
                </v-toolbar-title>
                </v-app-bar>
                <v-card-text>
                    <v-container>
                        <v-list>
                            <v-row justify-md="center">
                                <v-col cols="12" md="4">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            required
                                            class="mt-2"
                                            label="Nombre del Usuario"
                                            outlined
                                            >
                                            </v-text-field>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <v-text-field
                                            v-model="user.lastname"
                                            :rules="lastnameRules"
                                            required
                                            class="mt-2"
                                            label="Apellido(s)"
                                            outlined
                                            >
                                            </v-text-field>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <v-text-field
                                            v-model="user.email"
                                            :rules="emailRules"
                                            required
                                            class="mt-2"
                                            label="Email"
                                            outlined
                                            >
                                            </v-text-field>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    
                                                    <span class="body-1 font-weight-bold" style="color: black;">Sexo</span>
                                                    <br/>
                                                    <v-btn-toggle
                                                    v-model="user.gender"
                                                    rounded
                                                    color="primary"
                                                    dense
                                                    
                                                >
                                                    <v-btn value="1">
                                                    <v-icon left>mdi-human-male</v-icon>
                                                    Hombre
                                                    </v-btn>
                                                    <v-btn value="2">
                                                    <v-icon left>mdi-human-female</v-icon>
                                                    Mujer
                                                    </v-btn>
                                                </v-btn-toggle>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                </v-col>


                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.age"
                                                    :rules="ageRules"
                                                    required
                                                    class="mt-2"
                                                    label="Edad"
                                                    outlined
                                                    type="number"
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.password"
                                                    :rules="passwordRules"
                                                    required
                                                    class="mt-2"
                                                    label="Contraseña"
                                                    outlined
                                                    type="password"
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>
                            </v-row>

                        </v-list>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="editScreen = false">Cancelar</v-btn>
                <v-btn color="primary" @click="edit(user)">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="deleteScreen" max-width="550" persistent>
            <v-card>
                <v-app-bar dark color="primary">
                <v-toolbar-title class="title font-weight-light">
                    <v-avatar size="50">
                    <v-icon style="color:red">mdi-delete</v-icon>
                    </v-avatar>
                    <span style="font-size: 22px">Eliminar Usuario</span>
                </v-toolbar-title>
                </v-app-bar>
                <v-card-text>
                    <v-container>
                        <v-row justify-md="center">
                            <v-col cols="12" md="12">
                                <span class="text-h5" style="color:black;">¿Deseas eliminar el usuario de {{ userDelete.name }}?</span>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="deleteScreen = false">Cancelar</v-btn>
                <v-btn color="primary" @click="deleteBack(userDelete)">Si,Eliminar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

        <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-snackbar v-model="successSnackbar" color="success" bottom>
                    <span class="text-h3">Operación exitosa!</span>
                    <v-btn text @click="successSnackbar = false">Cerrar</v-btn>
                    </v-snackbar>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-snackbar v-model="errorSnackbar" color="success" bottom>
                    <span class="text-h3">Operación Erronea!</span>
                    <v-btn text @click="errorSnackbar = false">Cerrar</v-btn>
                    </v-snackbar>
                </v-col>
            </v-row>
        
    </div>
</template>

<script>
export default {
    name: "editUsers",
    data: () => ({
        search: "",
        users: [],
        successSnackbar: false,
        errorSnackbar: false,
        editScreen: false,
        user: [],
        deleteScreen: false,
        userDelete: [],
        headers: [
        {
            text: "#",
            align: "center",
            value: "id",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Nombre",
            value: "name",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Apellido(s)",
            value: "lastname",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Email",
            value: "email",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Genero",
            value: "gender",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Edad",
            value: "age",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
        {
            text: "Actions",
            value: "actions",
            align: "center",
            class: "white--text primary",
            divider: false,
        },
    ],
    nameRules: [
                value => !!value || 'Nombre del usuario es requerido', // Verifica si el campo está vacío
                value => (value && value.length <= 50) || 'Máximo 50 caracteres' // Verifica si el campo tiene más de 50 caracteres
            ],
        lastnameRules: [
                value => !!value || 'Apellidos son requeridos',
                value => (value && value.length <= 50) || 'Máximo 50 caracteres'
            ],
        emailRules: [
                value => !!value || 'Email es requerido',
                value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Dirección de correo electrónico no válida'
            ],
        ageRules: [
                value => !!value || 'Edad es requerida',
                value => !isNaN(parseFloat(value)) && isFinite(value) || 'Por favor, ingresa un número válido'
            ],
        passwordRules: [
                value => !!value || 'Contraseña es requerida',
                value => (value && value.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
            ],
    }),
    methods:{
        getUsers(){
            this.$axios.get("Users").then((response) => {
            this.users = response.data.users;
            console.log("users: ",this.users);
            })
            .catch(() => {
            })
            .finally(() => {
          
            });
        },
        editUser(item){
            console.log("edit user",item);
            this.user = Object.assign({}, item);
            console.log("user: ",this.user);
            this.editScreen = true;
        },
        edit(item){
            console.log(item);
            this.$axios.post("editUser", {
                userModified: item
            })
            .then(() => {
            })
            .catch((error) => {
                console.log("error",error);
                this.errorSnackbar = true;
            })
            .finally(() => {
            console.log("Exito");
            this.editScreen = false;
            this.getUsers();
            this.successSnackbar = true;
            });
        
        },
        deleteUser(item){
            console.log("delete item",item);
            this.userDelete = Object.assign({},item);
            this.deleteScreen = true;
        },
        deleteBack(item){
            this.$axios.post("deleteUser", {
                userDelete: item
            })
            .then(() => {
            })
            .catch((error) => {
                console.log("error",error);
                this.errorSnackbar = true;
            })
            .finally(() => {
            console.log("Exito");
            this.deleteScreen = false;
            this.successSnackbar = true;
            this.getUsers();
            });
        }
    },
    mounted(){
        this.getUsers();
    }
}
</script>