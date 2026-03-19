FROM public.ecr.aws/lambda/python:3.11

# Copy requirements and install dependencies
COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install -r requirements.txt

# Copy your Flask app
COPY app.py ${LAMBDA_TASK_ROOT}

# Install Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter ${LAMBDA_RUNTIME_DIR}

# Set environment variables for Lambda Web Adapter
ENV AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap
ENV RUST_LOG=info
ENV PORT=8080

CMD ["app.app"]
