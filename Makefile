BUILD_DIR=bin

all:
	go build -o $(BUILD_DIR)/main.out main.go

run:
	go run main.go

clean:
	@echo "Cleaning"
	rm -rf bin/main.out
