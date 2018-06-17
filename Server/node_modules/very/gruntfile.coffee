module.exports = (grunt) ->
  grunt.initConfig
    clean:
      dist: ["dist/"]
      coffee: ["dist/*.coffee"]

    coffee:
      compile:
        files: ["dist/very.js": "src/index.coffee"]

    uglify:
      dist:
        src: "dist/very.js"
        dest: "dist/very.min.js"

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.registerTask "build", ["clean:dist", "coffee", "uglify", "clean:coffee"]
  grunt.registerTask "default", ["build"]
