#Read data from stdin
import sys, json

def read_sentence():
  lines = sys.stdin.readlines()

  #Since our input would only be having one line, parse our JSON data from that
  return json.loads(lines[0])




def read_sentence1():
  line = sys.stdin.readline()
  #Since our input would only be having one line, parse our JSON data from that
  return line