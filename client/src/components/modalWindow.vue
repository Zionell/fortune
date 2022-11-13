<template>
  <div :class="$style.modalWindow">
    <div :class="$style.wrap">
      <div>
        <h2>Поздравляем!!!</h2>
        Вы выиграли: {{ prize }}
        <br />
        Чтобы получить скидку, заполните форму:
      </div>
      <form :class="$style.form" @submit.prevent="send">
        <input
          v-model="email"
          type="text"
          placeholder="Ваша почта"
          :class="[$style.input, { [$style._error]: this.error.email }]"
        />
        <input
          v-model="phone"
          type="text"
          v-maska="mask()"
          placeholder="Ваш номер телефона"
          :class="[$style.input, { [$style._error]: this.error.phone }]"
        />
        <button :class="$style.btn" type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalWindow",

  props: {
    prize: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      email: "",
      phone: "",
      error: {
        email: false,
        phone: false,
      },
    };
  },

  methods: {
    send() {
      let hasError = false;
      const error = {};
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
      const phoneRegex = /^\+7[0-9]{10}$/gi;

      if (!this.email || !emailRegex.test(this.email)) {
        hasError = true;
        error.email = true;
      }
      if (!this.phone || !phoneRegex.test(this.phone.replaceAll(" ", ""))) {
        hasError = true;
        error.phone = true;
      }

      if (hasError) {
        this.error = error;
      } else {
        this.$emit("send", { email: this.email, phone: this.phone });
      }
    },

    mask() {
      return "+# ### ### ## ##";
    },
  },
};
</script>

<style lang="scss" module>
.modalWindow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
}

.wrap {
  padding: 20px;
  border-radius: 20px;
  background: white;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.input {
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid green;
  transition: 0.3s linear;

  &:hover {
    border: 2px solid blue;
  }

  &:focus {
    outline: none;
    border: 2px solid blue;
  }

  &._error {
    border: 2px solid red;
  }
}

.btn {
  background: aquamarine;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  transition: 0.3s linear;

  &:hover {
    background: #4eb68d;
  }
}
</style>
