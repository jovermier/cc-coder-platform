package main

import "testing"

func TestNewExampleService(t *testing.T) {
	service := NewExampleService()
	if service == nil {
		t.Error("NewExampleService() returned nil")
	}
	if service.name != "example" {
		t.Errorf("Expected name 'example', got '%s'", service.name)
	}
}

func TestExampleService_Greet(t *testing.T) {
	service := NewExampleService()

	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "standard name",
			input:    "World",
			expected: "Hello, World!",
		},
		{
			name:     "empty string",
			input:    "",
			expected: "Hello, !",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := service.Greet(tt.input)
			if result != tt.expected {
				t.Errorf("Greet(%q) = %q, want %q", tt.input, result, tt.expected)
			}
		})
	}
}

func TestExampleService_Process(t *testing.T) {
	service := NewExampleService()

	t.Run("valid input", func(t *testing.T) {
		result, err := service.Process("test data")
		if err != nil {
			t.Errorf("Process() unexpected error: %v", err)
		}
		if result != "Processed: test data" {
			t.Errorf("Process() = %q, want 'Processed: test data'", result)
		}
	})

	t.Run("empty input", func(t *testing.T) {
		_, err := service.Process("")
		if err == nil {
			t.Error("Process() expected error for empty input")
		}
	})
}
