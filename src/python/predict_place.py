from read_data import read_sentence1
from read_data import convert
import pycountry

import geograpy

def main():
  text = read_sentence1()
  places = geograpy.get_place_context(text=text)
  countries  =  []
  for country_name in places.countries:
    country_object = pycountry.countries.get(name=country_name)
    countries.append({"name": country_name, "code": country_object.alpha_2})
  ret_obj = {"cities": places.cities, "countries": countries, "regions": places.regions, "other": places.other}
  print convert(ret_obj)


if __name__ == '__main__':
  main()