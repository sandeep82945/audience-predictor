from read_data import read_sentence1
from read_data import convert

import geograpy

def main():
	text = read_sentence1()
	places = geograpy.get_place_context(text=text)
	ret_obj = {"cities": places.cities, "countries": places.countries}
	print convert(ret_obj)


if __name__ == '__main__':
  main()