# About 

This page outlines introductory material and comparison between different automation stacks. The most important thing to remember here is most of these tools do not overlap. They interact and complement altogether. Everything here depends on your needs. 

* Continous Integration / testing
* Deployment
* Configuration
* Provisioning
* Orchestration
* ... and much more

# Definitions

* `DSL`: [domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language)

# Overview

## High level orchestration

Name | Foundation | Description         |    Deployment methods 
-----|------------|---------------------|------------------------
Saltstack

## Infrastructure Management

Most of the tools below are meant to be top / middle layer solutions that plug into other systems, such as Jenkins.

Name | Foundation | Description         |    Deployment methods 
-----|------------|---------------------|------------------------
Ansible | Python | Ansible was developed to simplify complex orchestration and configuration management tasks. script driven | Server or client/server
Chef | Ruby | End-to-end server deployment tool for Ops that can  manage server applications and utilities. Script driven | Server/Application Management. script driven | client/server
Puppet | Ruby | Puppet is a pioneering configuration automation and deployment orchestration solution for distributed apps and infrastructure. Agent/Master setup. agent-driven for target hosts | server/client
SaltStack | Python | Salt was designed to enable low-latency and high-speed communication for data collection and remote execution in sysadmin environments | client/server

## Integration Testing

These tools are best utilzed by more top-levle orchestration tools, such as as Puppet or StackStorm.

Name | Foundation | Description         | Deployment methods  
-----|------------|---------------------|------------------------------
Buildbot | Python | Continuous integration tool which is trusted by the Mozilla Foundation for bringing excellence into their products, and is now used at Mozilla, Chromium, WebKit and many other projects. | client/server
Jenkins | Java | Jenkins is the leading open source continuous integration tool. For the last few years it holds the top position in DevOps toolchains due to being free, open source and modular (although its baseline functionality is very limited, there are more than 1,000 plugins which extend Jenkins capabilities and provide extra integrations)| client/server

# Indepth

## Infrastructure Management

### Ansible

* Configuration management
* App deployment
* Automated workflow for Continuous Delivery
* Security and Compliance policy integration into automated processes
* Simplified orchestration

Pros:

* Easy remote execution, and low barrier to entry.
* Suitable for environments designed to scale rapidly.
* Shares facts between multiple servers, so they can query each other.
* Powerful orchestration engine. Strong focus on areas where others lack, such as zero- downtime rolling updates to multi-tier applications across the cloud.
* Easy installation and initial setup.
* Syntax and workflow is fairly easy to learn for new users.
* Sequential execution order.
* Supports both push and pull models.
* Lack of master eliminates failure points and performance issues. Agent-less deployment and communication is faster than the master-agent model.
* High security with SSH.

Cons:

* Increased focus on orchestration over configuration management.
* SSH communication slows down in scaled environments.
* Requires root SSH access and Python interpreter installed on machines, although agents are not required.
* The syntax across scripting components such as playbooks and templates can vary.
* Underdeveloped GUI with limited features.
* The platform is new and not entirely mature as compared to Puppet and Chef.

### Chef

* Infrastructure automation
* Cloud automation
* Automation for DevOps workflow
* Compliance and security management
* Automated workflow for Continuous Delivery

Pros:

* One of the most flexible solutions for OS and middleware management.
* Designed for programmers.
* Strong documentation, support and contributions from an active community.
* Very stable, reliable and mature, especially for large-scale deployments in both public and private environments.
* Chef offers hybrid and SaaS solutions for Chef server, analytics and reporting.
* Sequential execution order.

Cons:

* Requires a steep learning curve.
* Initial setup is complicated.
* Lacks push, so no immediate action on changes. The pull process follows a specified schedule.
* Documentation is spread out, and it can become difficult to review and follow.

### Puppet

* Orchestration
* Automated provisioning
* Configuration automation
* Visualization and reporting
* Code management
* Node management
* Role-based access control

Pros:

* Strong compliance automation and reporting tools.
* Active community support around development tools and cookbooks.
* Intuitive web UI to take care of many tasks, including reporting and real-time node management.
* Robust, native capability to work with shell-level constructs.
* Initial setup is smooth and supports a variety of OSs.
* Particularly useful, stable and mature solution for large enterprises with adequate DevOps skill resources to manage a heterogeneous infrastructure.

Cons:

* Can be difficult for new users who must learn Puppet DSL or Ruby, as advanced tasks usually require input from CLI.
* Installation process lacks adequate error reporting capabilities.
* Not the best solution available to scale deployments. The DSL code can grow large and complicated at higher scale.
* Using multiple masters complicates the management process. Remote execution can become challenging.
* Support is more focused toward Puppet DSL over pure Ruby versions.
* Lacks push system, so no immediate action on changes. The pull process follows a specified schedule for tasks.

### Saltstack

* Orchestration and automation for CloudOps
* Automation for ITOps
* Continuous code integration and deployment
* Application monitoring and auto-healing
* DevOps toolchain workflow automation with support for Puppet, Chef, Docker, Jenkins, Git, etc.
* … And several other use cases.

Pros:

* Effective for high scalability and resilient environments.
* Easy and straightforward usage past the initial installation and setup.
* Strong introspection.
* Active community and support.
* Feature-rich and consistent YAML syntax across all scripting tasks. Python offers a low learning curve for developers.

Cons:

* Installation process may not be smooth for new users.
* Documentation is not well managed, and is challenging to review.
* Web UI offers limited capabilities and features.
* Not the best option for OSs other than Linux.
* The platform is new and not entirely mature as compared to Puppet and Chef.

## Continuous Integration testing

# Conclusions

# Videos

* [Puppet vs. Jenkins (puppet.com)](https://youtu.be/lxRQBjtps5Q)

# Links / Sources

* http://www.intigua.com/blog/puppet-vs.-chef-vs.-ansible-vs.-saltstack
* https://www.blazemeter.com/blog/jenkins-vs-other-open-source-continuous-integration-servers
* [StackStorm Integrations](https://exchange.stackstorm.org)
