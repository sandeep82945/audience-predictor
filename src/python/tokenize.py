
import sys, json

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.tokenize import RegexpTokenizer
import string
from stop_words import get_stop_words

#Read data from stdin
def read_sentence():
  return sys.stdin.readline()
  lines = sys.stdin.readlines()
  #Since our input would only be having one line, parse our JSON data from that
  return json.loads(lines[0])


def main():
  #get our data as an array from read_in()
  input_sentence = read_sentence()
  #example_sentence="In the above code we first assign S the string Hello and then in the next line we set it to the concatenated output o     !!!!"

  example_sentence = example_sentence.translate(None, string.punctuation) #for removing punctuation

  stop_words= set(stopwords.words("english")) 

  words=word_tokenize(example_sentence) #tokenizing

  filtered_sentence= []

  stop_words2 = get_stop_words('en')
  stop_words2 = get_stop_words('english')

  for w in words:
    if w.lower() not in stop_words:   #removing stop words list 1
      if w.lower() not in stop_words2:  #removing stop words list 2
        filtered_sentence.append(w.lower())


  print filtered_sentence

if __name__ == '__main__':
  main()
