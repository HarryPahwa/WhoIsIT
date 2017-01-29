import serial
import test1

ser = serial.Serial('/dev/ttyACM0',9600)
s = [0,1]
while True:
	read_serial=ser.readline()
	
	print read_serial
	if read_serial!="":
		print "TRY"
		test1.main()

