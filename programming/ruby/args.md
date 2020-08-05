# Named Args


You can use OptionParser to easily perform some args parsing.

```
require 'optparse'

hash_options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: your_app [options]"
  opts.on('-a [ARG]', '--argument_a [ARG]', "Specify the argument_a") do |v|
    hash_options[:argument_a] = v
  end
  opts.on('-b [ARG]', '--argument_b [ARG]', "Specify the argument_b") do |v|
    hash_options[:argument_b] = v
  end
  opts.on('--version', 'Display the version') do 
    puts "VERSION"
    exit
  end
  opts.on('-h', '--help', 'Display this help') do 
    puts opts
    exit
  end
end.parse!
````

Then your application will need to be launch as :
```
ruby application -a=12 -b=42 or
ruby application --argument_a=12 --argument_b=42
```
