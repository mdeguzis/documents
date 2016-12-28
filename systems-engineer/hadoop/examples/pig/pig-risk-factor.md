-- Load the table geolocation using Hcatalog/HCatLoader
-- Save the results to 'a'

a = LOAD 'geolocation' USING org.apache.hive.hcatalog.pig.HCatLoader();

-- select a subset of the records, so we have the records of drivers for 
-- which the event is not normal.
-- instruct Pig to Filter our table and keep all records where event !=???normal??? 
-- and store this in b

b = FILTER a BY event !='normal';	

-- use the ???foreach??? operator on the grouped 
-- data to iterate through all the records.
-- Goal: know the number of non normal events associated with a driver, so to 
-- achieve this we add ???1??? to every row in the data set.

c = foreach b generate driverid, event, (int) '1' as occurance;

-- group the records by one or more relations
-- group by driver id and iterate over each row again to sum 
-- the non normal events.

d = group c by driverid;

-- use foreach again to add the occurance

e = foreach d generate group as driverid, SUM(c.occurance) as t_occ;

-- load drivermileage table into Pig using Hcatlog and perform a join 
-- operation on driverid. The resulting data set will give us total miles 
-- and total non normal events for a particular driver.

g = LOAD 'drivermileage' using org.apache.hive.hcatalog.pig.HCatLoader();
h = join e by driverid, g by driverid;

-- calculate driver risk factor by dividing the total miles travelled 
-- by non normal event occurrences.

final_data = foreach h generate $0 as driverid, $1 as events, $3 as totmiles, (float) $3/$1 as riskfactor;

-- Finally, store the data

store final_data into 'riskfactor' using org.apache.hive.hcatalog.pig.HCatStorer();

/* Summary

a = LOAD 'geolocation' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by event != 'normal';
c = foreach b generate driverid, event, (int) '1' as occurance;
d = group c by driverid;
e = foreach d generate group as driverid, SUM(c.occurance) as t_occ;
g = LOAD 'drivermileage' using org.apache.hive.hcatalog.pig.HCatLoader();
h = join e by driverid, g by driverid;
final_data = foreach h generate $0 as driverid, $1 as events, $3 as totmiles, (float) $3/$1 as riskfactor;
store final_data into 'riskfactor' using org.apache.hive.hcatalog.pig.HCatStorer();

*/
