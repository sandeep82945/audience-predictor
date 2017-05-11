from read_data import read_sentence
import geograpy

def main():
	text = read_sentence()
	places = geograpy.get_place_context(text=text)
	print places.cities


if __name__ == '__main__':
  main()