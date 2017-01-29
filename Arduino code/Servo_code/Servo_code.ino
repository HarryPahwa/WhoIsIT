/* Sweep
 by BARRAGAN <http://barraganstudio.com>
 This example code is in the public domain.

 modified 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Sweep
*/

#include <Servo.h>
const int knockSensor = A0; // the piezo is connected to analog pin 0
const int threshold = 100;  // threshold value to decide when the detected sound is a knock or not

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int i=0;int ledState = LOW; const int ledPin = 13;
// these variables will change:
int sensorReading = 0; 
void setup() {
  myservo.attach(10); 
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT);// attaches the servo on pin 9 to the servo object
}
 
void knock(){
  delay(1000);
  Serial.begin(115200);
  Serial.print("Go");
  delay(5000);
}
void loop() {
  sensorReading = analogRead(knockSensor);
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    sensorReading = analogRead(knockSensor);
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(100);   
    if (sensorReading >= threshold) {
    // toggle the status of the ledPin:
    ledState = !ledState;
    // update the LED pin itself:
    digitalWrite(ledPin, ledState);
    // send the string "Knock!" back to the computer, followed by newline
    Serial.println("Knock!");
    knock();
    //Serial.print(sensorReading);
    Serial.print(i);
    i=i+1;
  }// waits 15ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);   
    sensorReading = analogRead(knockSensor);// tell servo to go to position in variable 'pos'
    delay(100);   
    if (sensorReading >= threshold) {
    // toggle the status of the ledPin:
    ledState = !ledState;
    // update the LED pin itself:
    digitalWrite(ledPin, ledState);
    // send the string "Knock!" back to the computer, followed by newline
    Serial.println("Knock2!");
    Serial.print(i);
    i=i+1;
  }
  // waits 15ms for the servo to reach the position
  }
}
