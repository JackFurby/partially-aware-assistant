from setuptools import setup

setup(
    name='partially_aware_app',
    version="0.0.1",
    packages=['partially_aware_app'],
    setup_requires=['libsass >= 0.6.0'],
    sass_manifests={
        'partially_aware_app': ('static/scss/', 'static/css', '/static/css')
    },
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
