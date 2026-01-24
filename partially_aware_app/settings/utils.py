from partially_aware_app.models import SystemSettings


def get_system_settings():
	"""
	Returns the latest value for each system setting_name.

	Output is a dict e.g.

	{
		"rag_prompt": "...",
		"another_setting": "..."
	}
	"""

	settings = (
		SystemSettings.query
		.order_by(
			SystemSettings.setting_name,
			SystemSettings.update_datetime.desc(),
			SystemSettings.id.desc()
		)
		.all()
	)

	latest_settings = {}

	for setting in settings:
		# Get the fist value for each setting (settings are ordered newest to oldest)
		if setting.setting_name not in latest_settings:
			latest_settings[setting.setting_name] = setting.setting_value

	return latest_settings
