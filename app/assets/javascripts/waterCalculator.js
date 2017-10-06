/**
  * This program is calculating daily amount of water for man and woman
  * depending on the weight(kg) and physical activy(h).
  * It displays calculated data and shows filled bottle
  * @constructor
  * @see https://jquery.com/
  * @name WaterCalculatorSystem
*/

/**
  * Initializing default values and calling function for default data
**/
var CAPACITY = 9       // Max bottle capacity in litres
var BOTTLE_HEIGHT = 450   // Max height of bottle in PX
var WEIGHT = 20      // Default weight
var PHYSICAL_ACTIVITY = 0  // Default physical activity
var GENDER = 'man'      // Default gender
var NEW_HEIGHT = 0      // Default height of water
var VAL          // User daily amount of water

// Setting Datepicker
$('.born_at').datepicker()

// Changing gender function
$('.gender span').click(function () {
  $('.selected-gender').removeClass('selected-gender')
  $(this).addClass('selected-gender')
  GENDER = $(this).data('param')
  calculate()
})

// Event for Weight slider
$('.weight .slider').slider({
  min: 20,
  max: 140,
  step: 5,
  change: function (event, ui) {
    WEIGHT = ui.value
    calculate()
  }
})

// Event for Physical Activity slider
$('.physical-activity .slider').slider({
  min: 0,
  max: 6,
  step: 0.5,
  change: function (event, ui) {
    PHYSICAL_ACTIVITY = ui.value
    calculate()
  }
})

// Button click event handler; sending data to the server
$('.save').click(function () {
  createHistory()
})

/**
  * Main function for calculating and displaying data
  * @memberOf WaterCalculatorSystem
  * @name calculateForMan
*/
function calculate () {
  VAL = detectGender()
  NEW_HEIGHT = calculateHeight()
  showNewResult()
  draw()
}

/**
  * Calculations for man
  * @memberOf WaterCalculatorSystem
  * @name calculateForMan
*/
function calculateForMan () {
  return WEIGHT * 0.0314 + PHYSICAL_ACTIVITY * 0.63333
}

/**
  * Calculations for woman
  * @memberOf WaterCalculatorSystem
  * @name calculateForWoman
*/
function calculateForWoman () {
  return WEIGHT * 0.03 + PHYSICAL_ACTIVITY * 0.6
}

/**
  * Drawing filled bottle
  * @memberOf WaterCalculatorSystem
  * @name draw
*/
function draw () {
  $('.bottle-cals-bg').css('height', NEW_HEIGHT)
}

/**
  * Checking the gender
  * @memberOf WaterCalculatorSystem
  * @name detectGender
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
  * @memberOf WaterCalculatorSystem
  * @name showNewResult
*/
function showNewResult () {
  $('.weight-label span').text(WEIGHT + 'кг')
  $('.physical-label span').text(PHYSICAL_ACTIVITY + 'ч')
  $('.total span').text(VAL.toFixed(1) + 'л')
}

/**
  * Calculating new height of bottle
  * @memberOf WaterCalculatorSystem
  * @name calculateHeight
*/
function calculateHeight () {
  return (VAL / CAPACITY) * BOTTLE_HEIGHT
}

/**
  * Sending history data to the server
  * @memberOf WaterCalculatorSystem
  * @name createHistory
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
  * @memberOf WaterCalculatorSystem
  * @name displayStatusClassName
**/
function displayStatusClassName (data) {
  return data === 'successful'
    ? '.successful'
    : '.failed'
}

// Initializing for default values
VAL = calculate()
draw()