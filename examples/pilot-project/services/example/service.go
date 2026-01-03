package main

import "fmt"

// ExampleService is a simple service for testing AI agent workflows
type ExampleService struct {
	name string
}

// NewExampleService creates a new example service
func NewExampleService() *ExampleService {
	return &ExampleService{
		name: "example",
	}
}

// Greet returns a greeting message
func (s *ExampleService) Greet(name string) string {
	return fmt.Sprintf("Hello, %s!", name)
}

// Process processes input data
func (s *ExampleService) Process(input string) (string, error) {
	if input == "" {
		return "", fmt.Errorf("input cannot be empty")
	}
	return fmt.Sprintf("Processed: %s", input), nil
}
