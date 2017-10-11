/* global $ */
/**
  * This program is calculating daily amount of water for man and woman
  * depending on the weight(kg) and physical activy(h).
  * It displays calculated data and shows filled bottle
  * @constructor
  * @see https://jquery.com/
  * @name WaterCalculatorSystem
  * @author El Abdulla Karim
*/

/**
  * Initializing default values and calling function for default data
  * @constant {fixnum} CAPACITY
  * @constant {fixnum} BOTTLE_HEIGHT
**/
const CAPACITY = 9 // Max bottle capacity in litres
const BOTTLE_HEIGHT = 450 // Max height of bottle in PX
var WEIGHT = 20 // Default weight
var PHYSICAL_ACTIVITY = 0 // Default physical activity
var GENDER = 'man' // Default gender
var NEW_HEIGHT = 0 // Default height of water
var VAL // User daily amount of water

/*
  * Setting Datepicker
*/
$('.born_at').datepicker()

/**
  * Changing gender function
  * @event WaterCalculatorSystem#genderClick
**/
$('.gender span').click(function () {
  $('.selected-gender').removeClass('selected-gender')
  $(this).addClass('selected-gender')
  GENDER = $(this).data('param')
  calculate()
})

/**
  * Event for Weight slider
  * @event WaterCalculatorSystem#weightSlider
  * @property {fixnum} min - Min value of weight on slider
  * @property {fixnum} max - Max value of weight on slider
  * @property {fixnum} step - Step for slider
  * @param {object} event - something form jQuery UI
  * @params {object} ui - something form jQuery UI
**/
$('.weight .slider').slider({
  min: 20,
  max: 140,
  step: 5,
  change: function (event, ui) {
    WEIGHT = ui.value
    calculate()
  }
})

/**
  * Event for Physical Activity slider
  * @event WaterCalculatorSystem#physicalActivitySlider
  * @property {fixnum} min - Min value of physical activity on slider
  * @property {fixnum} max - Max value of Event for Physical Activity slider on slider
  * @property {fixnum} step - Step for slider
  * @param {object} event - something form jQuery UI
  * @params {object} ui - something form jQuery UI
**/
$('.physical-activity .slider').slider({
  min: 0,
  max: 6,
  step: 0.5,
  change: function (event, ui) {
    PHYSICAL_ACTIVITY = ui.value
    calculate()
  }
})

/**
  * Button click event handler; sending data to the server
  * @event WaterCalculatorSystem#saveButtonClick
**/
$('.save').click(function () {
  createHistory()
})

/**
  * Main function for calculating and displaying data
  * @function calculate
*/
function calculate () {
  VAL = detectGender()
  NEW_HEIGHT = calculateHeight()
  showNewResult()
  draw()
}

/**
  * @function calculateForMan
  * @returns {fixnum} Calculations for Man
*/
function calculateForMan () {
  return WEIGHT * 0.0314 + PHYSICAL_ACTIVITY * 0.63333
}

/**
  * @function calculateForWoman
  * @returns {fixnum} Calculations for Woman
*/
function calculateForWoman () {
  return WEIGHT * 0.03 + PHYSICAL_ACTIVITY * 0.6
}

/**
  * Drawing filled bottle
  * @function draw
*/
function draw () {
  $('.bottle-cals-bg').css('height', NEW_HEIGHT)
}

/**
  * Checking the gender
  * @function detectGender
  * @return {function} Return function for man or woman
*/
function detectGender () {
  if (GENDER === 'man') {
    return calculateForMan()
  } else {
    return calculateForWoman()
  }
}

/**
  * Changing all labels
  * @function showNewResult
*/
function showNewResult () {
  $('.weight-label span').text(WEIGHT + 'кг')
  $('.physical-label span').text(PHYSICAL_ACTIVITY + 'ч')
  $('.total span').text(VAL.toFixed(1) + 'л')
}

/**
  * Calculating new height of bottle
  * @function calculateHeight
  * @return {float} Return new height of filled bottle
*/
function calculateHeight () {
  return (VAL / CAPACITY) * BOTTLE_HEIGHT
}

/**
  * Sending history data to the server
  * @function createHistory
  * @property {boolean} async - Async AJAX or not
  * @property {string} dataType - Format of data type we should receieve
  * @property {string} method - What method do we use to send AJAX
  * @property {string} url - The url we trying to connect
  * @property {hash} data - The data we're sending to the serverr
  * @property {fixnum} data[history][weight] - Weight that we send
  * @property {float} data[history][physical_activity] - Physical Activity that we send
  * @property {float} data[history][capacity] - Daily amount of water
  * @property {function} success - Handle data that we receive and display message for user
**/
function createHistory () {
  $.ajax({
    async: true,
    dataType: 'JSON',
    method: 'POST',
    url: 'create_history',
    data: {
      'history': {
        'weight': WEIGHT,
        'physical_activity': PHYSICAL_ACTIVITY,
        'capacity': VAL.toFixed(1)
      }
    },
    success: function (data) {
      var kls = $(displayStatusClassName(data))
      kls.show()  // Show the div with status

      // Hide the div in 2 seconds
      setTimeout(function () {
        kls.hide()
      }, 2000)
    }
  })
}

/**
  * Determining response from the server and finding needed classname
  * @function displayStatusClassName
  * @return {string} Determine the response from the server and return needed class
**/
function displayStatusClassName (data) {
  return data === 'successful'
    ? '.successful'
    : '.failed'
}

// Initializing for default values
VAL = calculate()
draw()
