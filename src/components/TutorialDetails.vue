<template>
  <div v-if="currentTutorial.id" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="currentTutorial.description" />
      </div>

      <div class="form-group">
        <label for="user">User</label>
        <select id="user" class="form-control" v-model="currentTutorial.user.id">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2" v-if="currentTutorial.published" @click="updatePublished(false)">
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import UserDataService from "@/services/UserDataService";
import Tutorial from "@/types/Tutorial";
import User from "@/types/User";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorial",
  data() {
    return {
      currentTutorial: {} as Tutorial,
      users: [] as User[],
      message: "",
    };
  },
  methods: {
    getTutorial(id: any) {
      TutorialDataService.get(id)
        .then((response: ResponseData) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    getUsers() {
      UserDataService.getAll()
        .then((response: ResponseData) => {
          this.users = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      if (this.currentTutorial.userId == null) {
        console.error("User ID is not set.");
        return;
      }

      let data = {
        ...this.currentTutorial,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data, this.currentTutorial.userId)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTutorial() {
      console.log(this.currentTutorial.user);
      
      if (this.currentTutorial?.user?.id == null) {
        console.error("User ID is not set.");
        return;
      }

      let data = {
        ...this.currentTutorial,
        userId: this.currentTutorial?.user?.id  // Ensure userId is part of the data
      };

      TutorialDataService.update(this.currentTutorial.id, data, this.currentTutorial?.user?.id )
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
    this.getUsers();
  },
});
</script>
