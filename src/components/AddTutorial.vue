<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="user">User</label>
        <select id="user" class="form-control" v-model="tutorial.userId">
          <option value="" disabled>Select a user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";
import User from "@/types/User";
import UserDataService from "@/services/UserDataService";

export default defineComponent({
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
        userId: null, // Add userId field
      },
      submitted: false,
      users: [] as User[],
    };
  },
  methods: {
    getUsers() {
      UserDataService.getAll()
        .then((response: ResponseData) => {
          this.users = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    saveTutorial() {
      let data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        userId: this.tutorial.userId, // Include userId
      };

      TutorialDataService.create(data, this.tutorial.userId)
        .then((response: ResponseData) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = { id: null, title: "", description: "", published: false, userId: null };
    },
  },
  mounted() {
    this.getUsers();
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
