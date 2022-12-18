<template>
  <div class="wheelOfFortune">
    <img class="logo" src="./assets/logo.png" alt="Phomemo" />
    <canvas
      ref="wheel"
      class="wheel"
      :width="isMobile ? '360' : '700'"
      :height="isMobile ? '360' : '700'"
    ></canvas>
    <div ref="spin" class="spin">SPIN</div>
    <transition>
      <modalWindow v-if="isModal" :prize="prize" @send="sendMail($event)" />
    </transition>
    <div class="myLogo">Created: <MyLogo /></div>
  </div>
</template>

<script>
import modalWindow from "@/components/modalWindow";
import MyLogo from "@/components/MyLogo";

export default {
  name: "App",

  components: {
    modalWindow,
    MyLogo,
  },

  data() {
    return {
      sectors: [],
      ctx: null,
      dia: 0,
      PI: Math.PI,
      friction: 0.991,
      angVelMin: 0.002,
      angVelMax: 0,
      angVel: 0,
      ang: 0,
      isSpinning: false,
      prize: null,
      isModal: false,
    };
  },

  computed: {
    tot() {
      return this.sectors.length;
    },
    rad() {
      return this.dia / 2;
    },

    arc() {
      return (2 * this.PI) / this.sectors.length;
    },

    isMobile() {
      return window.innerWidth < 768;
    },
  },

  watch: {
    isSpinning() {
      if (!this.isSpinning) {
        this.getIndex();
        this.isModal = true;
      }
    },
  },

  async mounted() {
    await this.asyncData();

    this.ctx = this.$refs.wheel.getContext`2d`;
    this.dia = this.ctx.canvas.width;

    this.$refs.spin.addEventListener("click", () => {
      if (this.isSpinning) return;
      this.isSpinning = true;
      this.isAccelerating = true;
      this.angVelMax = this.rand(0.25, 0.4);
    });

    // INIT!
    this.sectors.forEach(this.drawSector);
    this.rotate(); // Initial rotation
    this.engine(); // Start engine!
  },

  methods: {
    getIndex() {
      const index =
        Math.floor(this.tot - (this.ang / (2 * this.PI)) * this.tot) % this.tot;

      this.prize = this.sectors[index]?.label;
    },

    async asyncData() {
      try {
        const sectors = await this.$axios.get("/api/get-content");
        this.sectors = sectors?.data;
      } catch (e) {
        console.log(e);
      }
    },

    async sendMail(val) {
      try {
        await this.$axios.post(
          "/api/send-result",
          {
            prize: this.prize,
            ...val,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        this.isModal = false;
      } catch (e) {
        console.log(e);
      }
    },

    rotate() {
      this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
    },

    engine() {
      this.frame();
      requestAnimationFrame(this.engine);
    },

    rand(m, M) {
      return Math.random() * (M - m) + m;
    },

    frame() {
      if (!this.isSpinning) return;

      if (this.angVel >= this.angVelMax) this.isAccelerating = false;

      if (this.isAccelerating) {
        this.angVel ||= this.angVelMin;
        this.angVel *= 1.06;
      } else {
        this.isAccelerating = false;
        this.angVel *= this.friction;

        if (this.angVel < this.angVelMin) {
          this.isSpinning = false;
          this.angVel = 0;
        }
      }

      this.ang += this.angVel; // Update angle
      this.ang %= 2 * this.PI; // Normalize angle
      this.rotate(); // CSS rotate!
    },

    drawSector(sector, i) {
      const ang = this.arc * i;
      this.ctx.save();
      // COLOR
      this.ctx.beginPath();
      this.ctx.fillStyle = sector.color;
      this.ctx.moveTo(this.rad, this.rad);
      this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc);
      this.ctx.lineTo(this.rad, this.rad);
      this.ctx.fill();
      // TEXT
      this.ctx.translate(this.rad, this.rad);
      this.ctx.rotate(ang + this.arc / 2);
      this.ctx.textAlign = "right";
      this.ctx.fillStyle = "#fff";

      if (this.isMobile) {
        this.ctx.font = "regular 10px sans-serif";
        this.ctx.width = "10px";
        this.ctx.whiteSpace = "break-word";
      } else {
        this.ctx.font = "bold 15px sans-serif";
      }

      this.ctx.fillText(sector.label, this.rad - 10, 10);
      //
      this.ctx.restore();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.wheelOfFortune {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #efd1ff;
}

.logo {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: inset 0 0 2px 2px #efd1ff;
}

.wheel {
  display: block;
}

.spin {
  font: 1.5rem/0 sans-serif;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  background: #9a3030;
  transform: translate(-50%, -50%);
  color: #fff;
  box-shadow: 0 0 0 8px currentColor, 0 0 15px 5px rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  transition: 0.8s;

  &::after {
    content: "";
    position: absolute;
    top: -17px;
    border: 10px solid transparent;
    border-bottom-color: currentColor;
    border-top: none;
  }

  @media (max-width: 768px) {
    font: 15px sans-serif;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 0 8px currentColor, 0 0 5px 5px rgba(0, 0, 0, 0.6);

    &::after {
      top: -14px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.myLogo {
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 500;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
  font-weight: bold;
}
</style>
