$(document).ready(function() {
      // Update auth links
      function updateAuthUI() {
        if (api.getToken()) {
          $('.header__top__links').html('<a href="#" id="logoutBtn">Logout</a> <a href="#">Profile</a> <a href="#">FAQs</a>');
        } else {
          $('.header__top__links').html('<a href="#" id="showAuthModal">Sign in</a> <a href="#" id="showAuthModalReg">Register</a> <a href="#">FAQs</a>');
        }
      }
      updateAuthUI();

      // Show modal on click
      $(document).on('click', '#showAuthModal', function(e) {
        e.preventDefault();
        $('#authModal').modal('show');
        $('#authTab a[href="#login"]').tab('show');
      });
      $(document).on('click', '#showAuthModalReg', function(e) {
        e.preventDefault();
        $('#authModal').modal('show');
        $('#authTab a[href="#register"]').tab('show');
      });

      // Login form
      $('#loginForm').submit(function(e) {
        e.preventDefault();
        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();
        api.loginUser(username, password).then(function(res) {
          if (res.access) {
            api.setToken(res.access);
            $('#authModal').modal('hide');
            updateAuthUI();
            $('#loginError').text('');
          } else {
            $('#loginError').text('Invalid credentials.');
          }
        });
      });

      // Register form
      $('#registerForm').submit(function(e) {
        e.preventDefault();
        var username = $('#registerUsername').val();
        var email = $('#registerEmail').val();
        var password = $('#registerPassword').val();
        api.registerUser(username, email, password).then(function(res) {
          if (res.id) {
            $('#authTab a[href="#login"]').tab('show');
            $('#registerError').text('Registration successful! Please log in.');
          } else {
            $('#registerError').text('Registration failed.');
          }
        });
      });

      // Logout
      $(document).on('click', '#logoutBtn', function(e) {
        e.preventDefault();
        api.removeToken();
        updateAuthUI();
      });
    });
