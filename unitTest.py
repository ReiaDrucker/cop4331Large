import requests
import json

base_url = 'https://cop4331-g25.herokuapp.com/api/'
headers = {'Content-Type': 'application/json','user-agent': 'advanced-rest-client','accept': '*/*'}
make_new_user = """{
  "userName": "newuser",
  "Password" : "12345",
  "firstName" : "Users",
  "lastName" : "12345",
  "email": "michaelrogatinsky@gmail.com",
  "admin" : "marym"
}"""
def post(ext, body):
	res = requests.post(base_url + ext, headers=headers, data=body)
	res = res.text if str(res) == '<Response [200]>' else '{"error":"could not connect to server"}'
	return res

def sign(body):
	return post('jwtSign', body)

def unsign(body):
	return post('jwtTest', body)


def test_JWT():
	signed = sign(make_new_user)
	unsigned = unsign(signed)
	# print(unsigned.text)
	if(json.loads(make_new_user)['userName'] == json.loads(unsigned)['userName']):
		print('Success, JWT Works!!!')
	else:
		print('Sorry, something went wrong')
	return signed
def test_signup_login(signed):
	post('registerUser', signed)
	login = post('loginUser', signed)
	login_u = json.loads(unsign(login))
	unsigned = json.loads(unsign(signed))
	if(login_u['userName'] == unsigned['userName']):
		print('Registration/login Success!!')
	else:
		print('Registration/Login Failed')
	return login

def test_trips(login):
	trip = '{"userName":"' + json.loads(unsign(login))['userName'] + '",'
	trip += '''
	"startLocation":"somewhere",
	"destination":"nowhere",
	"purpose":"adventure",
	"weather":"cloudy with a chance of meatballs",
	"startTime":"yesteryear"
	}
	'''
	signed = sign(trip)
	post('makeTrip', signed)
	my_trips = post('listTripsByUser', signed)
	unsigned = json.loads(unsign(my_trips))
	if(unsigned['Results'][0]['startTime'] == 'yesteryear'):
		print('Trips Success!')
	else:
		print('Sorry, trips Failed')
	# print(unsign(my_trips))

def main():
	print('Testing REST endpoints . . . \n\n')
	print('Testing JWTs:')
	signed = test_JWT()
	print('\n\nTesting Registration:')
	login = test_signup_login(signed)
	print('\n\nTesting Trips: ')
	test_trips(login)
	print('\n\nHooray, all the testing is done! Wasn\'t that easy.')
	

main()
