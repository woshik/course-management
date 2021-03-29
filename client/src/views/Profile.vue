<template>
  <div>
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Update Profile</h4>
      <form action="#" method="post">
        <div class="form-group">
          <label for="exampleFormControlInput1">Full Name</label>
          <input type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Email</label>
          <input type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Date of Birth</label>
          <input type="text" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Confirm</button>
      </form>
    </div>

    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Change Password</h4>
      <form action="#" method="post">
        <div class="form-group">
          <label for="exampleFormControlInput1">Current Password</label>
          <input type="password" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">New Password</label>
          <input type="password" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Confirm Password</label>
          <input type="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>
