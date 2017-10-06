# before test launch server
# ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
require 'spec_helper'

link = '/'

describe 'Should change gender' do
	before {
		visit link
		page.all(:css, '.gender span')[1].click
	}

	it 'should be woman', js: true do
		expect(page.find('.selected-gender')['data-param']).to eq("woman")
	end

	it 'should be man', js: true do
		page.all(:css, '.gender span')[0].click
		page.find('.weight-label span').text
		expect(page.find('.selected-gender')['data-param']).to eq("man")
	end
end

describe 'Should change' do
	before {
		visit link
	}

	it 'weight', js: true do
		span = page.find('.weight-label span')
		val = span.text
		page.execute_script("$('.weight .slider').slider('value', 80)")

		new_val = page.find('.weight-label span').text
		expect(val).not_to eq(new_val)
	end

	it 'weight', js: true do
		span = page.find('.physical-label span')
		val = span.text
		page.execute_script("$('.physical-activity .slider').slider('value', 3)")

		new_val = page.find('.physical-label span').text
		expect(val).not_to eq(new_val)
	end
end

describe 'Bottle' do
	before {
		visit link
	}

	it 'for man with weight 80 and activity of 3 should equal to', js: true do
		weight = 80.0
		physicalActivity = 3.0
		page.execute_script("$('.weight .slider').slider('value', #{weight})")
		page.execute_script("$('.physical-activity .slider').slider('value', #{physicalActivity})")
		expect(page.find('.total span').text.to_f).to eq((weight * 0.0314 + physicalActivity * 0.63333).round(1))
	end

	it 'for woman with weight 30 and activity of 4 should equal to', js: true do
		weight = 30.0
		physicalActivity = 4.0
		page.all(:css, '.gender span')[1].click
		page.execute_script("$('.weight .slider').slider('value', #{weight})")
		page.execute_script("$('.physical-activity .slider').slider('value', #{physicalActivity})")
		expect(page.find('.total span').text.to_f).to eq((weight * 0.03 + physicalActivity * 0.6).round(1))
	end

	it 'should has height of for woman weight 60 and activiy 2', js: true do
		weight = 60.0
		physicalActivity = 2.0
		capacity = 9 
		bottleHeight = 450;

		page.all(:css, '.gender span')[1].click
		page.execute_script("$('.weight .slider').slider('value', #{weight})")
		page.execute_script("$('.physical-activity .slider').slider('value', #{physicalActivity})")
		val = page.find('.total span').text.to_f
		expect(page.find('.bottle-cals-bg')['style'].split("height: ")[1].to_f.round(1)).to	eq((val / capacity) * bottleHeight.round(1))
	end
end
