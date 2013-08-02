/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        banner: "/**\n" +
                " * <%= pkg.name %>\n" +
                " * <%= pkg.description %>\n" +
                " *\n" +
                " * @author <%= pkg.author.name %>\n" +
                " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
                " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
                " * @link <%= pkg.homepage %>\n" +
                " * @module <%= pkg.name %>\n" +
                " * @version <%= pkg.version %>\n" +
                " */\n"
      },
      dist : {
        src : [
          "src/filterable-utils.js",
          "src/filterable-cell.js",
          "src/filterable-row.js",
          "src/filterable.js"
        ],
        dest : "lib/jquery.filterable.js"
      }
    },
    uglify : {
      options: {
        banner: "/**\n" +
                " * @author <%= pkg.author.name %>\n" +
                " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
                " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
                " * @link <%= pkg.homepage %>\n" +
                " * @module <%= pkg.name %>\n" +
                " * @version <%= pkg.version %> **/\n"
      },
      dist: {
        files: {
          "lib/jquery.filterable.min.js": ["<%= concat.dist.dest %>"]
        }
      }
    },
    qunit: {
      files: ["test/index.html"]
    },
    watch: {
      scripts: {
        files : "<config:lint.files>",
        tasks : "default"
      }
    },
    jshint: {
      files : [
        "Gruntfile.js",
        "src/*.js",
        "test/specs/*.js"
      ],
      options: {
        curly     : true,
        eqeqeq    : true,
        immed     : true,
        latedef   : true,
        noempty   : true,
        newcap    : true,
        noarg     : true,
        sub       : true,
        undef     : true,
        eqnull    : true,
        jquery    : true,
        unused    : true,
        bitwise   : true,
        camelcase : true,
        forin     : true,
        nonew     : true,
        quotmark  : true,
        trailing  : true
      }
    }
  });
  
  // Load Plugins
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  
  // Default task.
  grunt.registerTask("default", ["jshint", "qunit", "concat", "uglify"]);

};