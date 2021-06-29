new Vue({
    el: "#app",
    data: {
        player_health: 100,
        monster_health: 100,
        game_is_on: false,
        attack_multiple: 10,
        special_attack_multiple: 25,
        monster_attack_multiple: 15,
        heal_up_multiple: 20,
        log_text: {
            attack: "PLAYER ATTACK: ",
            special_attack: "SPECIAL ATTACK: ",
            monster_attack: "MONSTER_ATTACK: ",
            heal_up: "PLAYER HEAL UP: ",
            give_up: "PLAYER GIVE UP"
        },
        logs: []
    },
    methods: {
        start_game: function() {
            this.game_is_on = true;
        },
        attack: function() {
            let point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_health -= point;
            this.add_to_logs({ turn: "P", text: this.log_text.attack + point })
            this.monster_attact();
        },
        monster_attact: function() {
            let point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.add_to_logs({ turn: "M", text: this.log_text.monster_attack + point })
            this.player_health -= point;
        },
        special_attack: function() {
            let point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_health -= point;
            this.add_to_logs({ turn: "P", text: this.log_text.special_attack + point })
            this.monster_attact();
        },
        give_up: function() {
            this.player_health = 0;
            this.add_to_logs({ turn: "P", text: this.log_text.give_up })
        },
        heal_up: function() {
            let point = Math.ceil(Math.random() * this.heal_up_multiple);
            this.player_health += point;
            this.add_to_logs({ turn: "P", text: this.log_text.heal_up + point })
            this.monster_attact();
        },
        add_to_logs: function(log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_health: function(value) { //player_health değişkenin değerini izler, value parametresi değişen değer
            if (value <= 0) {
                this.player_health = 0;
                if (confirm("You LOST! Try Again?")) {
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_health = 100;
            }
        },
        monster_health: function(value) {
            if (value <= 0) {
                this.monster_health = 0;
                if (confirm("You WIN! Try Again?")) {
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        player_progress: function() {
            return {
                width: this.player_health + "%"
            }
        },
        monster_progress: function() {
            return {
                width: this.monster_health + "%"
            }
        }
    }
})